// Google Analytics event helpers
export function trackEvent(eventName, params = {}) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params)
  }
}

export function trackViewItem(product) {
  trackEvent('view_item', {
    currency: 'PKR',
    value: product.price,
    items: [{
      item_id: product.slug,
      item_name: product.name,
      item_category: product.category,
      price: product.price,
    }],
  })
}

export function trackAddToCart(product, quantity = 1) {
  trackEvent('add_to_cart', {
    currency: 'PKR',
    value: product.price * quantity,
    items: [{
      item_id: product.slug,
      item_name: product.name,
      item_category: product.category,
      price: product.price,
      quantity,
    }],
  })
}

export function trackBeginCheckout(cartItems, total) {
  trackEvent('begin_checkout', {
    currency: 'PKR',
    value: total,
    items: cartItems.map(item => ({
      item_id: item.slug,
      item_name: item.name,
      price: item.price,
      quantity: item.quantity,
    })),
  })
}

export function trackPurchase(orderNumber, total, items) {
  trackEvent('purchase', {
    transaction_id: orderNumber,
    currency: 'PKR',
    value: total,
    items: items.map(item => ({
      item_id: item.slug,
      item_name: item.name,
      price: item.price,
      quantity: item.quantity,
    })),
  })
}
