import { NavLink } from 'react-router-dom'

const adminMenu = [
  { to: '/admin', label: 'Dashboard' },
  { to: '/admin/books', label: 'Quản lý sách' },
  { to: '/admin/orders', label: 'Đơn hàng' },
  { to: '/admin/users', label: 'Người dùng' },
]

function AdminSidebar() {
  return (
    <aside
      style={{
        width: 240,
        borderRight: '1px solid #e5e7eb',
        padding: 16,
        background: '#f9fafb',
      }}
    >
      <h2 style={{ marginTop: 0 }}>Admin</h2>
      <nav style={{ display: 'grid', gap: 10 }}>
        {adminMenu.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/admin'}
            style={({ isActive }) => ({
              textDecoration: 'none',
              color: isActive ? '#1d4ed8' : '#374151',
              fontWeight: isActive ? 700 : 500,
            })}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

export default AdminSidebar
