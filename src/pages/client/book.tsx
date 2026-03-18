import BookCard from '../../components/client/book.card'
import { books } from '../../data/books'

function BookPage() {
  return (
    <section>
      <h1>Danh sách sách</h1>
      <p style={{ color: '#4b5563' }}>Tổng cộng: {books.length} đầu sách</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </section>
  )
}

export default BookPage
