import { Link } from 'react-router-dom'
import BookCard from '../../components/client/book.card'
import { books } from '../../data/books'

function HomePage() {
  const featuredBooks = books.slice(0, 3)

  return (
    <section style={{ display: 'grid', gap: 20 }}>
      <div
        style={{
          padding: 20,
          borderRadius: 12,
          border: '1px solid #e5e7eb',
          background: '#f8fafc',
        }}
      >
        <h1 style={{ marginTop: 0 }}>BookStore - Mua sách online</h1>
        <p style={{ color: '#4b5563' }}>
          Khám phá sách công nghệ, kỹ năng và tiểu thuyết với giá tốt mỗi ngày.
        </p>
        <Link to="/book" style={{ color: '#1d4ed8', textDecoration: 'none', fontWeight: 600 }}>
          Xem tất cả sách
        </Link>
      </div>

      <div>
        <h2 style={{ marginTop: 0 }}>Sách nổi bật</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
          {featuredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default HomePage
