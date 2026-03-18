import CsvImportPanel from '../../components/admin/csv.import.panel'

function AdminUsersPage() {
  return (
    <section>
      <h2>Quản lý người dùng</h2>
      <CsvImportPanel title="Nhập danh sách nhân viên từ CSV" entityLabel="nhân viên" />
      <ul style={{ paddingLeft: 18, color: '#374151' }}>
        <li>Nguyen Van A - customer</li>
        <li>Tran Thi B - customer</li>
        <li>Admin Root - admin</li>
      </ul>
    </section>
  )
}

export default AdminUsersPage
