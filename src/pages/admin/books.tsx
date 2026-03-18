import { books, formatVnd } from '../../data/books'

function AdminBooksPage() {
  return (
    <section>
      <h2>Quản lý sách</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', borderBottom: '1px solid #e5e7eb', padding: 8 }}>Tên sách</th>
            <th style={{ textAlign: 'left', borderBottom: '1px solid #e5e7eb', padding: 8 }}>Tác giả</th>
            <th style={{ textAlign: 'left', borderBottom: '1px solid #e5e7eb', padding: 8 }}>Giá</th>
            <th style={{ textAlign: 'left', borderBottom: '1px solid #e5e7eb', padding: 8 }}>Tồn kho</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td style={{ borderBottom: '1px solid #f3f4f6', padding: 8 }}>{book.title}</td>
              <td style={{ borderBottom: '1px solid #f3f4f6', padding: 8 }}>{book.author}</td>
              <td style={{ borderBottom: '1px solid #f3f4f6', padding: 8 }}>{formatVnd(book.price)}</td>
              <td style={{ borderBottom: '1px solid #f3f4f6', padding: 8 }}>{book.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

export default AdminBooksPage
