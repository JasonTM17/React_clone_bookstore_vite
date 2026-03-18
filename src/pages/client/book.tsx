import { useMemo, useState } from 'react'
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
      <h1>Danh sách sách</h1>
      <p style={{ color: '#4b5563' }}>Hiển thị: {filteredBooks.length} / {books.length} đầu sách</p>
      <div style={{ display: 'grid', gap: 10, gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', marginBottom: 14 }}>
        <input
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
          placeholder="Tìm theo tên sách hoặc tác giả"
          style={{ padding: 10, borderRadius: 8, border: '1px solid #d1d5db' }}
        />
        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          style={{ padding: 10, borderRadius: 8, border: '1px solid #d1d5db' }}
        >
          {categories.map((item) => (
            <option key={item} value={item}>
              {item === 'all' ? 'Tất cả thể loại' : item}
            </option>
          ))}
        </select>
        <select value={sort} onChange={(event) => setSort(event.target.value)} style={{ padding: 10, borderRadius: 8, border: '1px solid #d1d5db' }}>
          <option value="popular">Ưu tiên tồn kho</option>
          <option value="rating">Đánh giá cao</option>
          <option value="price-asc">Giá tăng dần</option>
          <option value="price-desc">Giá giảm dần</option>
        </select>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
        {filteredBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </section>
  )
}

export default BookPage
