import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <section>
      <h1>404 - Không tìm thấy trang</h1>
      <Link to="/" style={{ color: '#1d4ed8', textDecoration: 'none' }}>
        Quay lại trang chủ
      </Link>
    </section>
  )
}

export default NotFoundPage
