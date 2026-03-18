import { NavLink } from 'react-router-dom'

const navItems = [
	{ to: '/', label: 'Trang chủ' },
	{ to: '/book', label: 'Sách' },
	{ to: '/about', label: 'Giới thiệu' },
	{ to: '/cart', label: 'Giỏ hàng' },
]

function AppHeader() {
	return (
		<header
			style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-between',
				gap: 16,
				padding: '16px 24px',
				borderBottom: '1px solid #e5e7eb',
				position: 'sticky',
				top: 0,
				background: '#fff',
			}}
		>
			<NavLink to="/" style={{ fontWeight: 700, fontSize: 20, textDecoration: 'none', color: '#111827' }}>
				BookStore
			</NavLink>

			<nav style={{ display: 'flex', gap: 16 }}>
				{navItems.map((item) => (
					<NavLink
						key={item.to}
						to={item.to}
						style={({ isActive }) => ({
							textDecoration: 'none',
							fontWeight: isActive ? 700 : 500,
							color: isActive ? '#1d4ed8' : '#374151',
						})}
					>
						{item.label}
					</NavLink>
				))}
			</nav>

			<div style={{ display: 'flex', gap: 12 }}>
				<NavLink to="/login" style={{ textDecoration: 'none', color: '#1f2937' }}>
					Đăng nhập
				</NavLink>
				<NavLink to="/register" style={{ textDecoration: 'none', color: '#1f2937' }}>
					Đăng ký
				</NavLink>
			</div>
		</header>
	)
}

export default AppHeader
