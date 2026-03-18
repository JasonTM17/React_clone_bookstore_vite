import { books } from '../../data/books'

function AdminDashboardPage() {
  return (
    <section>
      <h2>Tổng quan</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 12 }}>
        <article style={{ border: '1px solid #e5e7eb', borderRadius: 8, padding: 12 }}>
          <p style={{ margin: 0, color: '#6b7280' }}>Số đầu sách</p>
          <h3 style={{ marginBottom: 0 }}>{books.length}</h3>
        </article>
        <article style={{ border: '1px solid #e5e7eb', borderRadius: 8, padding: 12 }}>
          <p style={{ margin: 0, color: '#6b7280' }}>Đơn chờ xử lý</p>
          <h3 style={{ marginBottom: 0 }}>8</h3>
        </article>
        <article style={{ border: '1px solid #e5e7eb', borderRadius: 8, padding: 12 }}>
          <p style={{ margin: 0, color: '#6b7280' }}>Khách hàng mới</p>
          <h3 style={{ marginBottom: 0 }}>14</h3>
        </article>
      </div>
    </section>
  )
}

export default AdminDashboardPage
