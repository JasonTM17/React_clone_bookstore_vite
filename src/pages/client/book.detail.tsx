import { Link, useParams } from 'react-router-dom'
import { useState } from 'react'
import { Button, Card, InputNumber, Rate, Space, Tag, Typography, message } from 'antd'
import { ShoppingCartOutlined } from '@ant-design/icons'
import { books, formatVnd } from '../../data/books'
import { addBookToCart } from '../../data/cart'

function BookDetailPage() {
  const { bookId } = useParams<{ bookId: string }>()
  const book = books.find((item) => item.id === bookId)
  const [quantity, setQuantity] = useState(1)

  if (!book) {
    return (
      <section>
        <Card>
          <Typography.Title level={3}>Không tìm thấy sách</Typography.Title>
          <Link to="/book" style={{ textDecoration: 'none' }}>
            <Button type="primary">Quay lại danh sách sách</Button>
          </Link>
        </Card>
      </section>
    )
  }

  const handleAddToCart = () => {
    addBookToCart(book, quantity)
    message.success(`Đã thêm ${quantity} cuốn "${book.title}" vào giỏ`)
  }

  return (
    <section style={{ display: 'grid', gridTemplateColumns: 'minmax(260px, 360px) 1fr', gap: 20 }}>
      <Card bodyStyle={{ padding: 10 }}>
        <img src={book.image} alt={book.title} style={{ width: '100%', borderRadius: 10 }} />
      </Card>

      <Card>
        <Space direction="vertical" size={10} style={{ width: '100%' }}>
          <Space>
            <Tag color="blue">{book.category}</Tag>
            <Tag color={book.stock > 10 ? 'success' : 'warning'}>Tồn kho: {book.stock}</Tag>
          </Space>

          <Typography.Title level={2} style={{ margin: 0 }}>
            {book.title}
          </Typography.Title>
          <Typography.Text type="secondary">Tác giả: {book.author}</Typography.Text>

          <Space align="center">
            <Rate allowHalf disabled value={book.rating} />
            <Typography.Text>{book.rating.toFixed(1)} / 5</Typography.Text>
          </Space>

          <Typography.Title level={3} style={{ margin: 0, color: '#1677ff' }}>
            {formatVnd(book.price)}
          </Typography.Title>

          <Typography.Paragraph style={{ marginBottom: 6 }}>{book.description}</Typography.Paragraph>

          <Space align="center" wrap>
            <Typography.Text strong>Số lượng</Typography.Text>
            <InputNumber
              min={1}
              max={book.stock}
              value={quantity}
              onChange={(value) => {
                const numeric = Number(value)

                if (Number.isNaN(numeric)) {
                  return
                }

                setQuantity(Math.min(Math.max(numeric, 1), book.stock))
              }}
            />
          </Space>

          <Space wrap>
            <Button type="primary" icon={<ShoppingCartOutlined />} size="large" onClick={handleAddToCart}>
              Thêm vào giỏ hàng
            </Button>
            <Link to="/cart" style={{ textDecoration: 'none' }}>
              <Button size="large">Đi đến giỏ hàng</Button>
            </Link>
          </Space>
        </Space>
      </Card>
    </section>
  )
}

export default BookDetailPage
