import { Link, useParams } from 'react-router-dom'
import { useState } from 'react'
import { books, formatVnd } from '../../data/books'
import { addBookToCart } from '../../data/cart'

function BookDetailPage() {
  const { bookId } = useParams<{ bookId: string }>()
  const book = books.find((item) => item.id === bookId)
  const [quantity, setQuantity] = useState(1)

  if (!book) {
    return (
      <section>
        <h1>Không tìm thấy sách</h1>
        <Link to="/book" style={{ color: '#1d4ed8', textDecoration: 'none' }}>
          Quay lại danh sách sách
        </Link>
      </section>
    )
  }

  return (
    <section style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 20 }}>
      <img src={book.image} alt={book.title} style={{ width: '100%', borderRadius: 12 }} />
      <div>
        <h1 style={{ marginTop: 0 }}>{book.title}</h1>
        <p style={{ color: '#4b5563' }}>Tác giả: {book.author}</p>
        <p style={{ color: '#4b5563' }}>Thể loại: {book.category}</p>
        <p style={{ fontWeight: 700, fontSize: 20 }}>{formatVnd(book.price)}</p>
        <p style={{ color: '#4b5563' }}>Đánh giá: {book.rating} / 5</p>
        <p style={{ color: '#4b5563' }}>Tồn kho: {book.stock}</p>
        <p>{book.description}</p>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginTop: 8 }}>
          <label htmlFor="quantity">Số lượng</label>
          <input
            id="quantity"
            type="number"
            min={1}
            max={book.stock}
            value={quantity}
            onChange={(event) => {
              const value = Number(event.target.value)
              if (Number.isNaN(value)) {
                return
              }

              if (value < 1) {
                setQuantity(1)
                return
              }

              if (value > book.stock) {
                setQuantity(book.stock)
                return
              }

              setQuantity(value)
            }}
            style={{ width: 80, padding: 8, borderRadius: 8, border: '1px solid #d1d5db' }}
          />
        </div>
        <div style={{ display: 'flex', gap: 12, marginTop: 12, alignItems: 'center' }}>
          <button
            type="button"
            onClick={() => addBookToCart(book, quantity)}
            style={{ padding: '10px 12px', borderRadius: 8, border: '1px solid #d1d5db', cursor: 'pointer' }}
          >
            Thêm vào giỏ hàng
          </button>
          <Link to="/cart" style={{ color: '#1d4ed8', textDecoration: 'none', fontWeight: 600 }}>
            Đi đến giỏ hàng
          </Link>
        </div>
      </div>
    </section>
  )
}

export default BookDetailPage
