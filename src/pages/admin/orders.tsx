import CsvImportPanel from '../../components/admin/csv.import.panel'

function AdminOrdersPage() {
  return (
    <section>
      <h2>Quản lý đơn hàng</h2>
      <CsvImportPanel title="Nhập đơn hàng từ CSV" entityLabel="đơn hàng" moduleKey="orders" />
      <ul style={{ paddingLeft: 18, color: '#374151' }}>
        <li>#ORD-1001 - Chờ xác nhận</li>
        <li>#ORD-1002 - Đang giao</li>
        <li>#ORD-1003 - Hoàn thành</li>
      </ul>
    </section>
  )
}

export default AdminOrdersPage
