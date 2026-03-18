import { useMemo, useState } from 'react'
import { Card, Empty, Input, Select, Space, Typography } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import BookCard from '../../components/client/book.card'
import { books } from '../../data/books'

function BookPage() {
  const [keyword, setKeyword] = useState('')
  const [category, setCategory] = useState('all')
  const [sort, setSort] = useState('popular')

  const categories = useMemo(() => ['all', ...new Set(books.map((book) => book.category))], [])

  const filteredBooks = useMemo(() => {
    const normalizedKeyword = keyword.trim().toLowerCase()

    return books
      .filter((book) => {
        const isMatchKeyword =
          normalizedKeyword.length === 0 ||
          book.title.toLowerCase().includes(normalizedKeyword) ||
          book.author.toLowerCase().includes(normalizedKeyword)

        const isMatchCategory = category === 'all' || book.category === category

        return isMatchKeyword && isMatchCategory
      })
      .sort((left, right) => {
        if (sort === 'price-asc') {
          return left.price - right.price
        }

        if (sort === 'price-desc') {
          return right.price - left.price
        }

        if (sort === 'rating') {
          return right.rating - left.rating
        }

        return right.stock - left.stock
      })
  }, [category, keyword, sort])

  return (
    <section>
      <Typography.Title level={2} style={{ marginBottom: 6 }}>
        Khám phá kho sách
      </Typography.Title>
      <Typography.Paragraph type="secondary" style={{ marginBottom: 16 }}>
        Hiển thị {filteredBooks.length} / {books.length} đầu sách phù hợp.
      </Typography.Paragraph>

      <Card style={{ marginBottom: 18 }} bodyStyle={{ padding: 14 }}>
        <Space wrap size={12} style={{ width: '100%' }}>
          <Input
            allowClear
            prefix={<SearchOutlined />}
            style={{ minWidth: 260, flex: 1 }}
            size="large"
            placeholder="Tìm theo tên sách hoặc tác giả"
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
          />
          <Select
            size="large"
            value={category}
            style={{ minWidth: 200 }}
            onChange={(value) => setCategory(value)}
            options={categories.map((item) => ({
              value: item,
              label: item === 'all' ? 'Tất cả thể loại' : item,
            }))}
          />
          <Select
            size="large"
            value={sort}
            style={{ minWidth: 200 }}
            onChange={(value) => setSort(value)}
            options={[
              { value: 'popular', label: 'Ưu tiên tồn kho' },
              { value: 'rating', label: 'Đánh giá cao' },
              { value: 'price-asc', label: 'Giá tăng dần' },
              { value: 'price-desc', label: 'Giá giảm dần' },
            ]}
          />
        </Space>
      </Card>

      {filteredBooks.length === 0 ? (
        <Empty description="Không tìm thấy đầu sách phù hợp" />
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 14 }}>
          {filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </section>
  )
}

export default BookPage
