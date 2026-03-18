import { useEffect, useMemo, useState } from 'react'
import { Alert, Spin } from 'antd'
import CsvImportPanel from '../../components/admin/csv.import.panel'
import { getAdminOrders, type AdminOrder } from '../../services/admin.service'

function formatVnd(value: number) {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(value)
}

function AdminOrdersPage() {
  const [orders, setOrders] = useState<AdminOrder[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadOrders = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await getAdminOrders()
      setOrders(response)
    } catch (loadError) {
      const message = loadError instanceof Error ? loadError.message : 'Không thể tải danh sách đơn hàng'
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadOrders()
  }, [])

  const exportRows = useMemo(
    () =>
      orders.map((order) => ({
        name: order.name || '',
        address: order.address || '',
        phone: order.phone || '',
        totalPrice: String(order.totalPrice ?? 0),
        type: 'COD',
        detailJson: JSON.stringify(order.detail ?? []),
      })),
    [orders],
  )

  return (
    <section>
      <h2>Quản lý đơn hàng</h2>
      <CsvImportPanel
        title="Nhập / xuất đơn hàng CSV"
        entityLabel="đơn hàng"
        moduleKey="orders"
        exportRows={exportRows}
        exportFileName="orders-export.csv"
        onImportSuccess={loadOrders}
      />

      {error && (
        <Alert style={{ marginBottom: 12 }} type="error" showIcon message="Lỗi tải dữ liệu đơn hàng" description={error} />
      )}

      {isLoading ? (
        <div style={{ padding: 12 }}>
          <Spin />
        </div>
      ) : (
        <ul style={{ paddingLeft: 18, color: '#374151' }}>
          {orders.map((order) => (
            <li key={order._id}>
              #{order._id} - {order.paymentStatus || 'UNPAID'} - {formatVnd(order.totalPrice ?? 0)}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default AdminOrdersPage
