import { Link } from 'react-router-dom'
import { formatVnd } from '../../data/books'
import type { Book } from '../../types/book'
import { addBookToCart } from '../../data/cart'

type BookCardProps = {
  book: Book
}

function BookCard({ book }: BookCardProps) {
  const handleAddToCart = () => {
    addBookToCart(book, 1)
  }

  return (
    <article
      style={{
        border: '1px solid #e5e7eb',
        borderRadius: 12,
        padding: 12,
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
      }}
    >
      <img
        src={book.image}
        alt={book.title}
        style={{ width: '100%', height: 220, objectFit: 'cover', borderRadius: 8 }}
      />
      <h3 style={{ margin: 0, fontSize: 18 }}>{book.title}</h3>
      <p style={{ margin: 0, color: '#4b5563' }}>{book.author}</p>
      <p style={{ margin: 0, color: '#1f2937' }}>{formatVnd(book.price)}</p>
      <p style={{ margin: 0, color: '#4b5563' }}>⭐ {book.rating} • Còn {book.stock} cuốn</p>
      <Link to={`/book/${book.id}`} style={{ marginTop: 4, color: '#1d4ed8', textDecoration: 'none' }}>
        Xem chi tiết
      </Link>
      <button
        type="button"
        onClick={handleAddToCart}
        style={{ marginTop: 8, padding: '8px 10px', borderRadius: 8, border: '1px solid #d1d5db', cursor: 'pointer' }}
      >
        Thêm vào giỏ
      </button>
    </article>
  )
}

export default BookCard
