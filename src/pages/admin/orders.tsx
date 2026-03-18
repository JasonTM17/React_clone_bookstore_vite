import CsvImportPanel from '../../components/admin/csv.import.panel'

const orderRows = [
  { id: 'ORD-1001', status: 'Chờ xác nhận' },
  { id: 'ORD-1002', status: 'Đang giao' },
  { id: 'ORD-1003', status: 'Hoàn thành' },
]

function AdminOrdersPage() {
  return (
    <section>
      <h2>Quản lý đơn hàng</h2>
      <CsvImportPanel
        title="Nhập / xuất đơn hàng CSV"
        entityLabel="đơn hàng"
        moduleKey="orders"
        exportRows={orderRows}
        exportFileName="orders-export.csv"
      />
      <ul style={{ paddingLeft: 18, color: '#374151' }}>
        <li>#ORD-1001 - Chờ xác nhận</li>
        <li>#ORD-1002 - Đang giao</li>
        <li>#ORD-1003 - Hoàn thành</li>
      </ul>
    </section>
  )
}

export default AdminOrdersPage
