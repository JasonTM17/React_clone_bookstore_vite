import { useEffect, useMemo, useState } from 'react'
import { Alert, Spin } from 'antd'
import CsvImportPanel from '../../components/admin/csv.import.panel'
import { getAdminBooks, type AdminBook } from '../../services/admin.service'

function formatVnd(value: number) {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(value)
}

function AdminBooksPage() {
  const [books, setBooks] = useState<AdminBook[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadBooks = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await getAdminBooks()
      setBooks(response)
    } catch (loadError) {
      const message = loadError instanceof Error ? loadError.message : 'Không thể tải danh sách sách'
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadBooks()
  }, [])

  const exportRows = useMemo(
    () =>
      books.map((book) => ({
        title: book.mainText || 'Unknown title',
        author: book.author || 'Unknown author',
        category: book.category || 'Business',
        price: String(book.price ?? 0),
        quantity: String(book.quantity ?? 0),
        thumbnail: book.thumbnail || '',
        mainText: book.mainText || '',
      })),
    [books],
  )

  return (
    <section>
      <h2>Quản lý sách</h2>
      <CsvImportPanel
        title="Nhập / xuất danh sách sách CSV"
        entityLabel="sách"
        moduleKey="books"
        exportRows={exportRows}
        exportFileName="books-export.csv"
        onImportSuccess={loadBooks}
      />

      {error && (
        <Alert style={{ marginBottom: 12 }} type="error" showIcon message="Lỗi tải dữ liệu sách" description={error} />
      )}

      {isLoading ? (
        <div style={{ padding: 12 }}>
          <Spin />
        </div>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', borderBottom: '1px solid #e5e7eb', padding: 8 }}>Mô tả / Tên sách</th>
              <th style={{ textAlign: 'left', borderBottom: '1px solid #e5e7eb', padding: 8 }}>Tác giả</th>
              <th style={{ textAlign: 'left', borderBottom: '1px solid #e5e7eb', padding: 8 }}>Giá</th>
              <th style={{ textAlign: 'left', borderBottom: '1px solid #e5e7eb', padding: 8 }}>Tồn kho</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book._id}>
                <td style={{ borderBottom: '1px solid #f3f4f6', padding: 8 }}>{book.mainText || '-'}</td>
                <td style={{ borderBottom: '1px solid #f3f4f6', padding: 8 }}>{book.author || '-'}</td>
                <td style={{ borderBottom: '1px solid #f3f4f6', padding: 8 }}>{formatVnd(book.price ?? 0)}</td>
                <td style={{ borderBottom: '1px solid #f3f4f6', padding: 8 }}>{book.quantity ?? 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  )
}

export default AdminBooksPage
