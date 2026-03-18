import { Link } from 'react-router-dom'
import { Button, Card, Rate, Space, Tag, Typography, message } from 'antd'
import { ShoppingCartOutlined } from '@ant-design/icons'
import { formatVnd } from '../../data/books'
import type { Book } from '../../types/book'
import { addBookToCart } from '../../data/cart'

type BookCardProps = {
  book: Book
}

function BookCard({ book }: BookCardProps) {
  const handleAddToCart = () => {
    addBookToCart(book, 1)
    message.success(`Đã thêm "${book.title}" vào giỏ hàng`)
  }

  return (
    <Card
      hoverable
      className="book-card"
      cover={
        <div style={{ position: 'relative' }}>
          <img
            src={book.image}
            alt={book.title}
            style={{ width: '100%', height: 240, objectFit: 'cover' }}
          />
          <Tag color="blue" style={{ position: 'absolute', left: 10, top: 10, margin: 0 }}>
            {book.category}
          </Tag>
        </div>
      }
      bodyStyle={{ padding: 14 }}
    >
      <Typography.Title level={5} style={{ marginTop: 0, marginBottom: 6 }} ellipsis={{ rows: 2 }}>
        {book.title}
      </Typography.Title>
      <Typography.Text type="secondary">{book.author}</Typography.Text>

      <div style={{ marginTop: 8, marginBottom: 8 }}>
        <Space size={8} align="center">
          <Rate disabled allowHalf value={book.rating} style={{ fontSize: 14 }} />
          <Typography.Text type="secondary">{book.rating.toFixed(1)}</Typography.Text>
        </Space>
      </div>

      <Space direction="vertical" size={8} style={{ width: '100%' }}>
        <Typography.Title level={4} style={{ margin: 0, color: '#1677ff' }}>
          {formatVnd(book.price)}
        </Typography.Title>
        <Tag color={book.stock > 10 ? 'success' : 'warning'} style={{ width: 'fit-content' }}>
          Còn {book.stock} cuốn
        </Tag>

        <Space style={{ width: '100%' }}>
          <Link to={`/book/${book.id}`} style={{ textDecoration: 'none' }}>
            <Button>Chi tiết</Button>
          </Link>
          <Button type="primary" icon={<ShoppingCartOutlined />} onClick={handleAddToCart}>
            Thêm giỏ
          </Button>
        </Space>
      </Space>
    </Card>
  )
}

export default BookCard
