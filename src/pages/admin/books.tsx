import { books, formatVnd } from '../../data/books'
import CsvImportPanel from '../../components/admin/csv.import.panel'

function AdminBooksPage() {
  const exportRows = books.map((book) => ({
    title: book.title,
    author: book.author,
    category: book.category,
    price: String(book.price),
    quantity: String(book.stock),
    sold: '0',
    thumbnail: book.image,
  }))

  return (
    <section>
      <h2>Quản lý sách</h2>
      <CsvImportPanel
        title="Nhập / xuất danh sách sách CSV"
        entityLabel="sách"
        moduleKey="books"
        exportRows={exportRows}
        exportFileName="books-export.csv"
      />
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
