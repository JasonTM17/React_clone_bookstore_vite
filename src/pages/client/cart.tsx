import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, Empty, InputNumber, Space, Typography, message } from 'antd'
import { DeleteOutlined, ShoppingOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { formatVnd } from '../../data/books'
import { clearCart, getCartItems, removeBookFromCart, updateBookQuantity } from '../../data/cart'
import type { CartItem } from '../../data/cart'

function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  useEffect(() => {
    const loadCart = () => {
      setCartItems(getCartItems())
    }

    loadCart()
    window.addEventListener('bookstore-cart-updated', loadCart)

    return () => {
      window.removeEventListener('bookstore-cart-updated', loadCart)
    }
  }, [])

  const total = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.book.price * item.quantity, 0)
  }, [cartItems])

  if (cartItems.length === 0) {
    return (
      <section>
        <Typography.Title level={2}>Giỏ hàng của bạn</Typography.Title>
        <Card>
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="Bạn chưa có sản phẩm nào trong giỏ"
          >
            <Link to="/book" style={{ textDecoration: 'none' }}>
              <Button type="primary" icon={<ShoppingOutlined />}>
                Đi mua sách ngay
              </Button>
            </Link>
          </Empty>
        </Card>
      </section>
    )
  }

  const shippingFee = total > 500000 ? 0 : 25000
  const finalTotal = total + shippingFee

  const handleCheckout = () => {
    message.success('Đơn hàng đã được ghi nhận, cảm ơn bạn đã mua sách!')
    clearCart()
  }

  return (
    <section>
      <Typography.Title level={2}>Giỏ hàng của bạn</Typography.Title>

      <div className="cart-layout" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16, alignItems: 'start' }}>
        <div style={{ display: 'grid', gap: 12 }}>
          {cartItems.map((item) => (
            <Card key={item.book.id} bodyStyle={{ padding: 14 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '92px 1fr auto', gap: 12, alignItems: 'center' }}>
                <img
                  src={item.book.image}
                  alt={item.book.title}
                  style={{ width: 92, height: 120, objectFit: 'cover', borderRadius: 8 }}
                />

                <div>
                  <Typography.Title level={5} style={{ margin: 0 }}>
                    {item.book.title}
                  </Typography.Title>
                  <Typography.Text type="secondary">{item.book.author}</Typography.Text>
                  <div style={{ marginTop: 6 }}>
                    <Typography.Text strong style={{ color: '#1677ff' }}>
                      {formatVnd(item.book.price)}
                    </Typography.Text>
                  </div>
                </div>

                <Space direction="vertical" align="end" size={8}>
                  <InputNumber
                    min={1}
                    max={item.book.stock}
                    value={item.quantity}
                    onChange={(value) => {
                      const quantityValue = Number(value)

                      if (Number.isNaN(quantityValue)) {
                        return
                      }

                      const nextValue = Math.min(Math.max(quantityValue, 1), item.book.stock)
                      updateBookQuantity(item.book.id, nextValue)
                    }}
                  />
                  <Typography.Text strong>{formatVnd(item.book.price * item.quantity)}</Typography.Text>
                  <Button
                    danger
                    type="text"
                    icon={<DeleteOutlined />}
                    onClick={() => removeBookFromCart(item.book.id)}
                  >
                    Xóa
                  </Button>
                </Space>
              </div>
            </Card>
          ))}
        </div>

        <Card title="Tóm tắt đơn hàng" style={{ position: 'sticky', top: 90 }}>
          <Space direction="vertical" size={10} style={{ width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography.Text>Tạm tính</Typography.Text>
              <Typography.Text>{formatVnd(total)}</Typography.Text>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography.Text>Phí vận chuyển</Typography.Text>
              <Typography.Text>{shippingFee === 0 ? 'Miễn phí' : formatVnd(shippingFee)}</Typography.Text>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography.Text strong>Tổng thanh toán</Typography.Text>
              <Typography.Title level={4} style={{ margin: 0, color: '#1677ff' }}>
                {formatVnd(finalTotal)}
              </Typography.Title>
            </div>
            <Button type="primary" size="large" block icon={<ShoppingCartOutlined />} onClick={handleCheckout}>
              Tiến hành thanh toán
            </Button>
            <Button block onClick={clearCart}>
              Xóa toàn bộ giỏ hàng
            </Button>
          </Space>
        </Card>
      </div>
    </section>
  )
}

export default CartPage
