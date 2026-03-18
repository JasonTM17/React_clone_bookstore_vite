import { Link, NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Avatar, Badge, Button, Drawer, Dropdown, Empty, InputNumber, Space, Typography } from 'antd'
import { DeleteOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons'
import { getCartCount, getCartItems, removeBookFromCart, updateBookQuantity, type CartItem } from '../../data/cart'
import {
	AUTH_STORAGE_UPDATED_EVENT,
	clearAuthSession,
	getAuthUser,
	isAdminUser,
	type AuthUser,
} from '../../services/auth-storage'
import { formatVnd } from '../../data/books'

const navItems = [
	{ to: '/', label: 'Trang chủ' },
	{ to: '/book', label: 'Sách' },
	{ to: '/about', label: 'Giới thiệu' },
	{ to: '/cart', label: 'Giỏ hàng' },
]

function AppHeader() {
	const [cartCount, setCartCount] = useState(0)
	const [currentUser, setCurrentUser] = useState<AuthUser | null>(null)
	const [cartItems, setCartItems] = useState<CartItem[]>([])
	const [isMiniCartOpen, setIsMiniCartOpen] = useState(false)

	useEffect(() => {
		const updateCount = () => {
			setCartCount(getCartCount())
			setCartItems(getCartItems())
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

	const subtotal = cartItems.reduce((sum, item) => sum + item.book.price * item.quantity, 0)

	const userMenuItems = [
		...(isAdminUser(currentUser) ? [{ key: 'admin', label: <NavLink to="/admin">Trang quản trị</NavLink> }] : []),
		{ key: 'logout', label: <span onClick={handleLogout}>Đăng xuất</span> },
	]

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
				<Badge count={cartCount} size="small" offset={[2, -2]}>
					<Button icon={<ShoppingCartOutlined />} onClick={() => setIsMiniCartOpen(true)}>
						Giỏ hàng
					</Button>
				</Badge>

				{currentUser ? (
					<>
						<Dropdown menu={{ items: userMenuItems }} trigger={['click']}>
							<Space style={{ cursor: 'pointer' }}>
								<Avatar icon={<UserOutlined />} />
								<span style={{ color: '#1f2937' }}>{currentUser.fullName || 'User'}</span>
							</Space>
						</Dropdown>
					</>
				) : (
					<>
						<NavLink to="/auth/login" style={{ textDecoration: 'none' }}>
							<Button>Đăng nhập</Button>
						</NavLink>
						<NavLink to="/auth/register" style={{ textDecoration: 'none' }}>
							<Button type="primary">Đăng ký</Button>
						</NavLink>
					</>
				)}
			</div>

			<Drawer
				title="Giỏ hàng nhanh"
				open={isMiniCartOpen}
				onClose={() => setIsMiniCartOpen(false)}
				width={420}
			>
				{cartItems.length === 0 ? (
					<Empty description="Chưa có sản phẩm trong giỏ" />
				) : (
					<Space direction="vertical" size={12} style={{ width: '100%' }}>
						{cartItems.map((item) => (
							<div
								key={item.book.id}
								style={{
									display: 'grid',
									gridTemplateColumns: '70px 1fr auto',
									gap: 10,
									alignItems: 'center',
									borderBottom: '1px solid #f0f0f0',
									paddingBottom: 8,
								}}
							>
								<img
									src={item.book.image}
									alt={item.book.title}
									style={{ width: 70, height: 90, objectFit: 'cover', borderRadius: 8 }}
								/>
								<div>
									<Typography.Text strong style={{ display: 'block' }} ellipsis>
										{item.book.title}
									</Typography.Text>
									<Typography.Text type="secondary" style={{ fontSize: 12 }}>
										{formatVnd(item.book.price)}
									</Typography.Text>
								</div>
								<Space direction="vertical" size={6} align="end">
									<InputNumber
										min={1}
										max={item.book.stock}
										value={item.quantity}
										onChange={(value) => {
											const quantity = Number(value)

											if (Number.isNaN(quantity)) {
												return
											}

											updateBookQuantity(item.book.id, Math.min(Math.max(quantity, 1), item.book.stock))
										}}
									/>
									<Button
										type="text"
										danger
										icon={<DeleteOutlined />}
										onClick={() => removeBookFromCart(item.book.id)}
									/>
								</Space>
							</div>
						))}

						<div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
							<Typography.Text strong>Tạm tính</Typography.Text>
							<Typography.Title level={5} style={{ margin: 0, color: '#1677ff' }}>
								{formatVnd(subtotal)}
							</Typography.Title>
						</div>

						<Space style={{ width: '100%', justifyContent: 'space-between' }}>
							<Link to="/cart" onClick={() => setIsMiniCartOpen(false)} style={{ textDecoration: 'none' }}>
								<Button>Xem giỏ hàng</Button>
							</Link>
							<Link to="/cart" onClick={() => setIsMiniCartOpen(false)} style={{ textDecoration: 'none' }}>
								<Button type="primary">Thanh toán</Button>
							</Link>
						</Space>
					</Space>
				)}
			</Drawer>
		</header>
	)
}

export default AppHeader
