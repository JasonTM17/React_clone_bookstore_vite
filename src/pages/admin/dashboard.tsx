import { useEffect, useState } from 'react'
import { Alert, Spin } from 'antd'
import { getAdminDashboardSummary, type DashboardSummary } from '../../services/admin.service'

function AdminDashboardPage() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadSummary = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const data = await getAdminDashboardSummary()
        setSummary(data)
      } catch (loadError) {
        const message = loadError instanceof Error ? loadError.message : 'Không thể tải thống kê dashboard'
        setError(message)
      } finally {
        setIsLoading(false)
      }
    }

    loadSummary()
  }, [])

  return (
    <section>
      <h2>Tổng quan</h2>

      {error && (
        <Alert style={{ marginBottom: 12 }} type="error" showIcon message="Lỗi tải thống kê" description={error} />
      )}

      {isLoading && (
        <div style={{ padding: 12 }}>
          <Spin />
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 12 }}>
        <article style={{ border: '1px solid #e5e7eb', borderRadius: 8, padding: 12 }}>
          <p style={{ margin: 0, color: '#6b7280' }}>Số đầu sách</p>
          <h3 style={{ marginBottom: 0 }}>{summary?.countBook ?? 0}</h3>
        </article>
        <article style={{ border: '1px solid #e5e7eb', borderRadius: 8, padding: 12 }}>
          <p style={{ margin: 0, color: '#6b7280' }}>Tổng đơn hàng</p>
          <h3 style={{ marginBottom: 0 }}>{summary?.countOrder ?? 0}</h3>
        </article>
        <article style={{ border: '1px solid #e5e7eb', borderRadius: 8, padding: 12 }}>
          <p style={{ margin: 0, color: '#6b7280' }}>Tổng người dùng</p>
          <h3 style={{ marginBottom: 0 }}>{summary?.countUser ?? 0}</h3>
        </article>
      </div>
    </section>
  )
}

export default AdminDashboardPage
