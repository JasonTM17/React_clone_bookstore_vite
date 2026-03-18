import { Link, Navigate, Outlet } from 'react-router-dom'
import AdminSidebar from './admin.sidebar'
import { clearAuthSession, getAccessToken, getAuthUser, isAdminUser } from '../../services/auth-storage'

function AdminLayout() {
  const token = getAccessToken()
  const user = getAuthUser()

  if (!token || !isAdminUser(user)) {
    return <Navigate to="/auth/login" replace />
  }

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
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <Link to="/" style={{ textDecoration: 'none', color: '#1d4ed8' }}>
              Về trang client
            </Link>
            <button
              type="button"
              onClick={clearAuthSession}
              style={{
                border: 'none',
                background: 'transparent',
                color: '#1f2937',
                cursor: 'pointer',
              }}
            >
              Đăng xuất
            </button>
          </div>
        </header>
        <main style={{ padding: 20 }}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
