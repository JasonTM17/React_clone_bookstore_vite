import { Link, useParams } from 'react-router-dom'
import { books, formatVnd } from '../../data/books'

function BookDetailPage() {
  const { bookId } = useParams<{ bookId: string }>()
  const book = books.find((item) => item.id === bookId)

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
        <Link to="/cart" style={{ color: '#1d4ed8', textDecoration: 'none', fontWeight: 600 }}>
          Thêm vào giỏ hàng
        </Link>
      </div>
    </section>
  )
}

export default BookDetailPage
