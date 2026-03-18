import { Link } from 'react-router-dom'
import { Button, Card, Col, Row, Space, Statistic, Typography } from 'antd'
import { RocketOutlined, SafetyCertificateOutlined, ThunderboltOutlined } from '@ant-design/icons'
import BookCard from '../../components/client/book.card'
import { books } from '../../data/books'

function HomePage() {
  const featuredBooks = books.slice(0, 3)
  const totalStock = books.reduce((sum, item) => sum + item.stock, 0)

  return (
    <section style={{ display: 'grid', gap: 20 }}>
      <Card className="hero-card" bodyStyle={{ padding: 24 }}>
        <Row gutter={[24, 24]} align="middle">
          <Col xs={24} md={15}>
            <Typography.Title level={1} style={{ marginTop: 0, marginBottom: 10, fontSize: 34 }}>
              BookStore Premium
            </Typography.Title>
            <Typography.Paragraph style={{ color: '#475467', fontSize: 16 }}>
              Mua sách online với giao hàng nhanh, lựa chọn phong phú và trải nghiệm đọc sách hiện đại.
            </Typography.Paragraph>

            <Space wrap size={10}>
              <Link to="/book" style={{ textDecoration: 'none' }}>
                <Button type="primary" size="large">
                  Khám phá ngay
                </Button>
              </Link>
              <Link to="/cart" style={{ textDecoration: 'none' }}>
                <Button size="large">Xem giỏ hàng</Button>
              </Link>
            </Space>

            <Row gutter={[12, 12]} style={{ marginTop: 18 }}>
              <Col span={8}>
                <Statistic title="Đầu sách" value={books.length} />
              </Col>
              <Col span={8}>
                <Statistic title="Tồn kho" value={totalStock} />
              </Col>
              <Col span={8}>
                <Statistic title="Đánh giá TB" value={4.8} precision={1} />
              </Col>
            </Row>
          </Col>

          <Col xs={24} md={9}>
            <Space direction="vertical" size={10} style={{ width: '100%' }}>
              <Card size="small">
                <Space>
                  <RocketOutlined style={{ color: '#1677ff' }} />
                  <Typography.Text>Giao nhanh toàn quốc</Typography.Text>
                </Space>
              </Card>
              <Card size="small">
                <Space>
                  <SafetyCertificateOutlined style={{ color: '#52c41a' }} />
                  <Typography.Text>Thanh toán an toàn</Typography.Text>
                </Space>
              </Card>
              <Card size="small">
                <Space>
                  <ThunderboltOutlined style={{ color: '#faad14' }} />
                  <Typography.Text>Ưu đãi mỗi ngày</Typography.Text>
                </Space>
              </Card>
            </Space>
          </Col>
        </Row>
      </Card>

      <div>
        <Typography.Title level={3} style={{ marginTop: 0 }}>
          Sách nổi bật tuần này
        </Typography.Title>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 14 }}>
          {featuredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default HomePage
