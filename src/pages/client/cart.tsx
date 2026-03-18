import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { formatVnd } from '../../data/books'
import { clearCart, getCartItems, removeBookFromCart, updateBookQuantity } from '../../data/cart'
import type { CartItem } from '../../data/cart'

function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  useEffect(() => {
    const loadCart = () => {
      setCartItems(getCartItems())
    }

    loadCart()
    window.addEventListener('bookstore-cart-updated', loadCart)

    return () => {
      window.removeEventListener('bookstore-cart-updated', loadCart)
    }
  }, [])

  const total = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.book.price * item.quantity, 0)
  }, [cartItems])

  if (cartItems.length === 0) {
    return (
      <section>
        <h1>Giỏ hàng</h1>
        <p style={{ color: '#4b5563' }}>Bạn chưa có sản phẩm nào trong giỏ.</p>
        <Link to="/book" style={{ color: '#1d4ed8', textDecoration: 'none', fontWeight: 600 }}>
          Đi mua sách
        </Link>
      </section>
    )
  }

  return (
    <section>
      <h1>Giỏ hàng</h1>
      <div style={{ display: 'grid', gap: 12 }}>
        {cartItems.map((item) => (
          <article key={item.book.id} style={{ border: '1px solid #e5e7eb', borderRadius: 8, padding: 12 }}>
            <h3 style={{ marginTop: 0, marginBottom: 4 }}>{item.book.title}</h3>
            <p style={{ margin: 0, color: '#4b5563' }}>{item.book.author}</p>
            <p style={{ margin: '6px 0', fontWeight: 600 }}>{formatVnd(item.book.price)}</p>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginTop: 8 }}>
              <label htmlFor={`qty-${item.book.id}`}>Số lượng</label>
              <input
                id={`qty-${item.book.id}`}
                type="number"
                min={1}
                max={item.book.stock}
                value={item.quantity}
                onChange={(event) => {
                  const value = Number(event.target.value)

                  if (Number.isNaN(value)) {
                    return
                  }

                  const nextValue = Math.min(Math.max(value, 1), item.book.stock)
                  updateBookQuantity(item.book.id, nextValue)
                }}
                style={{ width: 80, padding: 8, borderRadius: 8, border: '1px solid #d1d5db' }}
              />
              <button
                type="button"
                onClick={() => removeBookFromCart(item.book.id)}
                style={{ padding: '8px 10px', borderRadius: 8, border: '1px solid #d1d5db', cursor: 'pointer' }}
              >
                Xóa
              </button>
            </div>
          </article>
        ))}
      </div>
      <p style={{ marginTop: 16, fontWeight: 700 }}>Tổng tiền: {formatVnd(total)}</p>
      <div style={{ display: 'flex', gap: 10 }}>
        <button
          type="button"
          onClick={clearCart}
          style={{ padding: '10px 12px', borderRadius: 8, border: '1px solid #d1d5db', cursor: 'pointer' }}
        >
          Xóa toàn bộ
        </button>
        <button
          type="button"
          style={{ padding: '10px 12px', borderRadius: 8, border: '1px solid #1d4ed8', cursor: 'pointer', color: '#1d4ed8' }}
        >
          Tiến hành thanh toán
        </button>
      </div>
    </section>
  )
}

export default CartPage
