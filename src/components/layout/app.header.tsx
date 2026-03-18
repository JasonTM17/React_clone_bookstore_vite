import { NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getCartCount } from '../../data/cart'
import {
	AUTH_STORAGE_UPDATED_EVENT,
	clearAuthSession,
	getAuthUser,
	isAdminUser,
	type AuthUser,
} from '../../services/auth-storage'

const navItems = [
	{ to: '/', label: 'Trang chủ' },
	{ to: '/book', label: 'Sách' },
	{ to: '/about', label: 'Giới thiệu' },
	{ to: '/cart', label: 'Giỏ hàng' },
]

function AppHeader() {
	const [cartCount, setCartCount] = useState(0)
	const [currentUser, setCurrentUser] = useState<AuthUser | null>(null)

	useEffect(() => {
		const updateCount = () => {
			setCartCount(getCartCount())
		}

		updateCount()
		window.addEventListener('bookstore-cart-updated', updateCount)

		return () => {
			window.removeEventListener('bookstore-cart-updated', updateCount)
		}
	}, [])

	useEffect(() => {
		const updateAuth = () => {
			setCurrentUser(getAuthUser())
		}

		updateAuth()
		window.addEventListener(AUTH_STORAGE_UPDATED_EVENT, updateAuth)

		return () => {
			window.removeEventListener(AUTH_STORAGE_UPDATED_EVENT, updateAuth)
		}
	}, [])

	const handleLogout = () => {
		clearAuthSession()
	}

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

			<div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
				<NavLink to="/cart" style={{ textDecoration: 'none', color: '#1f2937', fontWeight: 600 }}>
					Giỏ ({cartCount})
				</NavLink>

				{currentUser ? (
					<>
						<span style={{ color: '#1f2937' }}>Xin chào, {currentUser.fullName || 'User'}</span>
						{isAdminUser(currentUser) && (
							<NavLink to="/admin" style={{ textDecoration: 'none', color: '#1d4ed8', fontWeight: 600 }}>
								Admin
							</NavLink>
						)}
						<button
							type="button"
							onClick={handleLogout}
							style={{
								border: 'none',
								background: 'transparent',
								color: '#1f2937',
								cursor: 'pointer',
							}}
						>
							Đăng xuất
						</button>
					</>
				) : (
					<>
						<NavLink to="/auth/login" style={{ textDecoration: 'none', color: '#1f2937' }}>
							Đăng nhập
						</NavLink>
						<NavLink to="/auth/register" style={{ textDecoration: 'none', color: '#1f2937' }}>
							Đăng ký
						</NavLink>
					</>
				)}
			</div>
		</header>
	)
}

export default AppHeader
