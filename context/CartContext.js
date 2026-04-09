'use client'

import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('tom_cart')
      if (saved) setCartItems(JSON.parse(saved))
    } catch {}
  }, [])

  // Persist to localStorage on change
  useEffect(() => {
    localStorage.setItem('tom_cart', JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = useCallback((product, quantity = 1, size = null) => {
    setCartItems(prev => {
      const key = `${product.id}-${size || product.size}`
      const existing = prev.find(item => item.key === key)
      if (existing) {
        return prev.map(item =>
          item.key === key
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      return [...prev, {
        key,
        id: product.id,
        slug: product.slug,
        name: product.name,
        price: product.price,
        size: size || product.size,
        image: product.images[0],
        quantity,
      }]
    })
  }, [])

  const removeFromCart = useCallback((key) => {
    setCartItems(prev => prev.filter(item => item.key !== key))
  }, [])

  const updateQuantity = useCallback((key, newQty) => {
    if (newQty < 1) return
    setCartItems(prev =>
      prev.map(item => item.key === key ? { ...item, quantity: newQty } : item)
    )
  }, [])

  const clearCart = useCallback(() => setCartItems([]), [])

  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  const isInCart = useCallback((productId, size) => {
    return cartItems.some(item => item.id === productId && (!size || item.size === size))
  }, [cartItems])

  const openCart = useCallback(() => setIsCartOpen(true), [])
  const closeCart = useCallback(() => setIsCartOpen(false), [])

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartTotal,
      cartCount,
      isInCart,
      isCartOpen,
      openCart,
      closeCart,
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
