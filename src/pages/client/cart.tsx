import { books, formatVnd } from '../../data/books'

function CartPage() {
  const cartItems = books.slice(0, 2)
  const total = cartItems.reduce((sum, item) => sum + item.price, 0)

  return (
    <section>
      <h1>Giỏ hàng</h1>
      <div style={{ display: 'grid', gap: 12 }}>
        {cartItems.map((item) => (
          <article key={item.id} style={{ border: '1px solid #e5e7eb', borderRadius: 8, padding: 12 }}>
            <h3 style={{ marginTop: 0, marginBottom: 4 }}>{item.title}</h3>
            <p style={{ margin: 0, color: '#4b5563' }}>{item.author}</p>
            <p style={{ margin: 0, fontWeight: 600 }}>{formatVnd(item.price)}</p>
          </article>
        ))}
      </div>
      <p style={{ marginTop: 16, fontWeight: 700 }}>Tổng tiền: {formatVnd(total)}</p>
    </section>
  )
}

export default CartPage
