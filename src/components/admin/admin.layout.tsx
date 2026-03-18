import { Link, Outlet } from 'react-router-dom'
import AdminSidebar from './admin.sidebar'

function AdminLayout() {
  return (
    <div style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: '240px 1fr' }}>
      <AdminSidebar />
      <div>
        <header
          style={{
            borderBottom: '1px solid #e5e7eb',
            padding: '16px 20px',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <h1 style={{ margin: 0, fontSize: 22 }}>BookStore Admin</h1>
          <Link to="/" style={{ textDecoration: 'none', color: '#1d4ed8' }}>
            Về trang client
          </Link>
        </header>
        <main style={{ padding: 20 }}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
