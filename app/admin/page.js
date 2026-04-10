'use client'

import { useState, useEffect, useCallback } from 'react'

// ─── Helpers ──────────────────────────────────────────────────────────────────
function formatPKR(amount) {
  return 'PKR ' + Number(amount).toLocaleString('en-PK')
}

function formatDate(str) {
  return new Date(str).toLocaleString('en-PK', {
    timeZone: 'Asia/Karachi', dateStyle: 'medium', timeStyle: 'short',
  })
}

const STATUS_COLORS = {
  pending: { bg: '#F0F0F0', color: '#555' },
  confirmed: { bg: '#EBF5FB', color: '#1A5276' },
  shipped: { bg: '#FEF9E7', color: '#B7770D' },
  delivered: { bg: '#EAFAF1', color: '#1E8449' },
  cancelled: { bg: '#FDEDEC', color: '#CB4335' },
}

// ─── PASSWORD GATE ─────────────────────────────────────────────────────────────
function PasswordGate({ onSuccess }) {
  const [pw, setPw] = useState('')
  const [error, setError] = useState(false)

  const check = async () => {
    const res = await fetch('/api/admin/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: pw }),
    })
    if (res.ok) {
      sessionStorage.setItem('tom_admin', '1')
      onSuccess()
    } else {
      setError(true)
      setPw('')
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F7F4EF' }}>
      <div style={{ background: '#fff', padding: '48px 40px', width: 360, boxShadow: '0 4px 24px rgba(28,43,58,0.1)' }}>
        <p style={{ fontFamily: '"Libre Baskerville", serif', fontSize: '1.4rem', fontWeight: 400, margin: '0 0 8px', color: '#1C2B3A' }}>Admin Access</p>
        <p style={{ fontSize: '0.8rem', color: '#6A7F8E', margin: '0 0 24px' }}>The Oil Merchant Dashboard</p>
        <input
          type="password"
          placeholder="Enter password"
          value={pw}
          onChange={e => { setPw(e.target.value); setError(false) }}
          onKeyDown={e => { if (e.key === 'Enter') check() }}
          style={{ width: '100%', padding: '12px 14px', border: `1px solid ${error ? '#E53E3E' : '#E5E9EC'}`, marginBottom: 8, fontSize: '0.875rem', outline: 'none', boxSizing: 'border-box' }}
          autoFocus
        />
        {error && <p style={{ color: '#E53E3E', fontSize: '0.75rem', margin: '0 0 12px' }}>Incorrect password</p>}
        <button
          onClick={check}
          style={{ width: '100%', padding: '12px', background: '#1C2B3A', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}
        >
          Enter Dashboard
        </button>
      </div>
    </div>
  )
}

// ─── ORDERS TAB ────────────────────────────────────────────────────────────────
function OrdersTab() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/orders').then(r => r.json()).then(d => {
      setOrders(d.orders || [])
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  const updateStatus = async (orderId, newStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o))
    await fetch('/api/admin/orders', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: orderId, status: newStatus }),
    })
  }

  if (loading) return <div style={{ padding: 40, color: '#6A7F8E' }}>Loading orders…</div>

  return (
    <div style={{ overflowX: 'auto' }}>
      {orders.length === 0 ? (
        <p style={{ padding: 40, color: '#6A7F8E', textAlign: 'center' }}>No orders yet.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
          <thead>
            <tr style={{ background: '#F7F4EF' }}>
              {['Order #', 'Date', 'Customer', 'Phone', 'City', 'Items', 'Total', 'Status'].map(h => (
                <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#6A7F8E', whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id} style={{ borderBottom: '1px solid #F0F0F0' }}>
                <td style={{ padding: '12px 14px', fontWeight: 600, color: '#1C2B3A' }}>{order.order_number}</td>
                <td style={{ padding: '12px 14px', color: '#6A7F8E', whiteSpace: 'nowrap' }}>{formatDate(order.created_at)}</td>
                <td style={{ padding: '12px 14px' }}>
                  <div style={{ fontWeight: 500 }}>{order.customer_name}</div>
                  <div style={{ fontSize: '0.72rem', color: '#6A7F8E' }}>{order.customer_email}</div>
                </td>
                <td style={{ padding: '12px 14px' }}>{order.customer_phone}</td>
                <td style={{ padding: '12px 14px' }}>{order.city}</td>
                <td style={{ padding: '12px 14px' }}>
                  {Array.isArray(order.items) ? order.items.map((item, i) => (
                    <div key={i} style={{ fontSize: '0.72rem', color: '#4A5568' }}>{item.name} ×{item.quantity}</div>
                  )) : <span style={{ color: '#6A7F8E' }}>—</span>}
                </td>
                <td style={{ padding: '12px 14px', fontWeight: 600, whiteSpace: 'nowrap' }}>{formatPKR(order.total)}</td>
                <td style={{ padding: '12px 14px' }}>
                  <select
                    value={order.status}
                    onChange={e => updateStatus(order.id, e.target.value)}
                    style={{
                      padding: '6px 10px',
                      border: '1px solid #E5E9EC',
                      borderRadius: 3,
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      background: STATUS_COLORS[order.status]?.bg || '#F0F0F0',
                      color: STATUS_COLORS[order.status]?.color || '#555',
                    }}
                  >
                    {Object.keys(STATUS_COLORS).map(s => (
                      <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

// ─── PRODUCTS TAB ──────────────────────────────────────────────────────────────
function ProductsTab() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editProduct, setEditProduct] = useState(null)
  const [successMsg, setSuccessMsg] = useState('')
  const [uploadingId, setUploadingId] = useState(null)

  const CATEGORIES = ['Hair Care', 'Essential Oils', 'Carrier Oils', 'Butters & Waxes']

  const emptyForm = { name: '', slug: '', description: '', price: '', original_price: '', category: 'Hair Care', size: '', stock_quantity: 50, badge: '', image_url: '', is_active: true }
  const [form, setForm] = useState(emptyForm)

  const loadProducts = useCallback(() => {
    fetch('/api/admin/products').then(r => r.json()).then(d => {
      setProducts(d.products || [])
      setLoading(false)
    })
  }, [])

  useEffect(() => { loadProducts() }, [loadProducts])

  const setField = (k, v) => setForm(f => {
    const updated = { ...f, [k]: v }
    if (k === 'name' && !editProduct) {
      updated.slug = v.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
    }
    return updated
  })

  const showSuccess = (msg) => {
    setSuccessMsg(msg)
    setTimeout(() => setSuccessMsg(''), 3000)
  }

  const handleSave = async () => {
    const res = await fetch('/api/admin/products', {
      method: editProduct ? 'PATCH' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editProduct ? { ...form, id: editProduct.id } : form),
    })
    if (res.ok) {
      showSuccess(editProduct ? 'Product updated!' : 'Product added!')
      setShowForm(false)
      setEditProduct(null)
      setForm(emptyForm)
      loadProducts()
    }
  }

  const handleDelete = async (id, name) => {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return
    await fetch('/api/admin/products', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    showSuccess('Product deleted.')
    loadProducts()
  }

  const handleImageUpload = async (file, productId) => {
    setUploadingId(productId)
    const formData = new FormData()
    formData.append('file', file)
    formData.append('productId', productId)
    const res = await fetch('/api/upload', { method: 'POST', body: formData })
    const data = await res.json()
    if (data.url) {
      setProducts(prev => prev.map(p => p.id === productId ? { ...p, image_url: data.url } : p))
      showSuccess('Image uploaded!')
    }
    setUploadingId(null)
  }

  if (loading) return <div style={{ padding: 40, color: '#6A7F8E' }}>Loading products…</div>

  return (
    <div>
      {successMsg && (
        <div style={{ background: '#EAFAF1', border: '1px solid #82E0AA', color: '#1E8449', padding: '10px 16px', marginBottom: 16, fontSize: '0.8rem', fontWeight: 500 }}>
          {successMsg}
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 20 }}>
        <button
          onClick={() => { setShowForm(true); setEditProduct(null); setForm(emptyForm) }}
          style={{ padding: '10px 20px', background: '#1C2B3A', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600 }}
        >
          + Add New Product
        </button>
      </div>

      {showForm && (
        <div style={{ background: '#F7F4EF', padding: 28, marginBottom: 24, border: '1px solid #E5E9EC' }}>
          <h3 style={{ margin: '0 0 20px', fontFamily: '"Libre Baskerville", serif', fontWeight: 400 }}>
            {editProduct ? `Edit: ${editProduct.name}` : 'New Product'}
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            {[
              { label: 'Name', key: 'name', type: 'text' },
              { label: 'Slug (auto)', key: 'slug', type: 'text' },
              { label: 'Price (PKR)', key: 'price', type: 'number' },
              { label: 'Original Price', key: 'original_price', type: 'number' },
              { label: 'Size', key: 'size', type: 'text' },
              { label: 'Stock Qty', key: 'stock_quantity', type: 'number' },
              { label: 'Badge', key: 'badge', type: 'text' },
              { label: 'Image URL', key: 'image_url', type: 'text' },
            ].map(({ label, key, type }) => (
              <div key={key}>
                <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 600, color: '#6A7F8E', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</label>
                <input type={type} value={form[key] || ''} onChange={e => setField(key, e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', border: '1px solid #E5E9EC', fontSize: '0.8rem', boxSizing: 'border-box' }} />
              </div>
            ))}
            <div>
              <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 600, color: '#6A7F8E', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Category</label>
              <select value={form.category} onChange={e => setField('category', e.target.value)}
                style={{ width: '100%', padding: '10px 12px', border: '1px solid #E5E9EC', fontSize: '0.8rem' }}>
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <label style={{ fontSize: '0.7rem', fontWeight: 600, color: '#6A7F8E', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Active</label>
              <input type="checkbox" checked={form.is_active} onChange={e => setField('is_active', e.target.checked)} style={{ width: 18, height: 18, accentColor: '#2A6496' }} />
            </div>
          </div>
          <div style={{ marginTop: 14 }}>
            <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 600, color: '#6A7F8E', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Description</label>
            <textarea rows={3} value={form.description || ''} onChange={e => setField('description', e.target.value)}
              style={{ width: '100%', padding: '10px 12px', border: '1px solid #E5E9EC', fontSize: '0.8rem', resize: 'vertical', boxSizing: 'border-box' }} />
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
            <button onClick={handleSave} style={{ padding: '10px 24px', background: '#2A6496', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600 }}>
              Save Product
            </button>
            <button onClick={() => { setShowForm(false); setEditProduct(null) }} style={{ padding: '10px 20px', background: '#F0F0F0', color: '#555', border: 'none', cursor: 'pointer', fontSize: '0.8rem' }}>
              Cancel
            </button>
          </div>
        </div>
      )}

      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
        <thead>
          <tr style={{ background: '#F7F4EF' }}>
            {['Image', 'Name', 'Category', 'Price', 'Stock', 'Active', 'Actions'].map(h => (
              <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#6A7F8E' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id} style={{ borderBottom: '1px solid #F0F0F0' }}>
              <td style={{ padding: '10px 14px' }}>
                <div style={{ position: 'relative', display: 'inline-block' }}>
                  <img src={p.image_url || 'https://placehold.co/48x60/EEF5FA/2A6496?text=?'} alt={p.name}
                    style={{ width: 48, height: 60, objectFit: 'cover', display: 'block' }} />
                  <label style={{ position: 'absolute', bottom: 0, right: 0, background: 'rgba(28,43,58,0.7)', cursor: 'pointer', padding: 3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                    <input type="file" accept="image/jpeg,image/png,image/webp" style={{ display: 'none' }}
                      onChange={e => e.target.files[0] && handleImageUpload(e.target.files[0], p.id)} />
                  </label>
                  {uploadingId === p.id && <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem' }}>…</div>}
                </div>
              </td>
              <td style={{ padding: '10px 14px' }}>
                <div style={{ fontWeight: 500 }}>{p.name}</div>
                <div style={{ fontSize: '0.7rem', color: '#6A7F8E' }}>{p.slug}</div>
              </td>
              <td style={{ padding: '10px 14px', color: '#6A7F8E' }}>{p.category}</td>
              <td style={{ padding: '10px 14px', fontWeight: 500 }}>{formatPKR(p.price)}</td>
              <td style={{ padding: '10px 14px' }}>{p.stock_quantity}</td>
              <td style={{ padding: '10px 14px' }}>
                <span style={{ display: 'inline-block', width: 10, height: 10, borderRadius: '50%', background: p.is_active ? '#7D9B77' : '#ccc' }} />
              </td>
              <td style={{ padding: '10px 14px' }}>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={() => { setEditProduct(p); setForm({ name: p.name, slug: p.slug, description: p.description || '', price: p.price, original_price: p.original_price || '', category: p.category, size: p.size || '', stock_quantity: p.stock_quantity, badge: p.badge || '', image_url: p.image_url || '', is_active: p.is_active }); setShowForm(true) }}
                    style={{ padding: '5px 12px', background: '#EEF5FA', color: '#2A6496', border: 'none', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 500 }}>Edit</button>
                  <button onClick={() => handleDelete(p.id, p.name)}
                    style={{ padding: '5px 12px', background: '#FDEDEC', color: '#CB4335', border: 'none', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 500 }}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ─── STATS TAB ─────────────────────────────────────────────────────────────────
function StatsTab() {
  const [stats, setStats] = useState(null)

  useEffect(() => {
    fetch('/api/admin/stats').then(r => r.json()).then(setStats)
  }, [])

  if (!stats) return <div style={{ padding: 40, color: '#6A7F8E' }}>Loading stats…</div>

  const cards = [
    { label: 'Total Orders', value: stats.totalOrders, color: '#2A6496' },
    { label: 'Orders Today', value: stats.ordersToday, color: '#7D9B77' },
    { label: 'Revenue This Month', value: formatPKR(stats.monthRevenue), color: '#C8A96E' },
    { label: 'Active Products', value: stats.activeProducts, color: '#5B9EC9' },
  ]

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 32 }}>
        {cards.map(c => (
          <div key={c.label} style={{ background: '#fff', border: '1px solid #E5E9EC', padding: '24px 20px' }}>
            <p style={{ margin: '0 0 8px', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6A7F8E' }}>{c.label}</p>
            <p style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700, color: c.color }}>{c.value}</p>
          </div>
        ))}
      </div>

      <h3 style={{ fontFamily: '"Libre Baskerville", serif', fontWeight: 400, margin: '0 0 16px', fontSize: '1rem' }}>Orders by Status</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12 }}>
        {Object.entries(stats.byStatus || {}).map(([status, count]) => (
          <div key={status} style={{ background: STATUS_COLORS[status]?.bg || '#F0F0F0', padding: '16px 14px', textAlign: 'center' }}>
            <p style={{ margin: '0 0 4px', fontSize: '1.4rem', fontWeight: 700, color: STATUS_COLORS[status]?.color || '#555' }}>{count}</p>
            <p style={{ margin: 0, fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: STATUS_COLORS[status]?.color || '#555' }}>{status}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── MAIN DASHBOARD ────────────────────────────────────────────────────────────
export default function AdminPage() {
  const [authed, setAuthed] = useState(false)
  const [tab, setTab] = useState('orders')

  useEffect(() => {
    if (sessionStorage.getItem('tom_admin') === '1') setAuthed(true)
  }, [])

  if (!authed) return <PasswordGate onSuccess={() => setAuthed(true)} />

  const logout = () => {
    sessionStorage.removeItem('tom_admin')
    setAuthed(false)
  }

  const TABS = [
    { id: 'orders', label: 'Orders' },
    { id: 'products', label: 'Products' },
    { id: 'stats', label: 'Stats' },
  ]

  return (
    <div style={{ minHeight: '100vh', background: '#F7F4EF' }}>
      {/* Admin header */}
      <div style={{ background: '#1C2B3A', padding: '0 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 56 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <p style={{ margin: 0, fontFamily: '"Libre Baskerville", serif', fontSize: '0.9rem', color: '#fff', letterSpacing: '0.05em' }}>the oil merchant</p>
          <span style={{ color: 'rgba(255,255,255,0.3)' }}>·</span>
          <p style={{ margin: 0, fontSize: '0.7rem', color: 'rgba(212,234,245,0.7)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Admin Dashboard</p>
        </div>
        <button onClick={logout} style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: 'none', cursor: 'pointer', padding: '6px 14px', fontSize: '0.7rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          Logout
        </button>
      </div>

      {/* Tabs */}
      <div style={{ background: '#fff', borderBottom: '1px solid #E5E9EC', padding: '0 40px', display: 'flex', gap: 0 }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            style={{ padding: '14px 20px', border: 'none', background: 'none', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: tab === t.id ? '#1C2B3A' : '#6A7F8E', borderBottom: tab === t.id ? '2px solid #1C2B3A' : '2px solid transparent' }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ padding: 40, maxWidth: 1400, margin: '0 auto' }}>
        <div style={{ background: '#fff', border: '1px solid #E5E9EC', padding: 28 }}>
          {tab === 'orders' && <OrdersTab />}
          {tab === 'products' && <ProductsTab />}
          {tab === 'stats' && <StatsTab />}
        </div>
      </div>
    </div>
  )
}
