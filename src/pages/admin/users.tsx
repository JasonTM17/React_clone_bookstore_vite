import CsvImportPanel from '../../components/admin/csv.import.panel'

const userRows = [
  { fullName: 'Nguyen Van A', role: 'customer' },
  { fullName: 'Tran Thi B', role: 'customer' },
  { fullName: 'Admin Root', role: 'admin' },
]

function AdminUsersPage() {
  return (
    <section>
      <h2>Quản lý người dùng</h2>
      <CsvImportPanel
        title="Nhập / xuất nhân viên CSV"
        entityLabel="nhân viên"
        moduleKey="users"
        exportRows={userRows}
        exportFileName="users-export.csv"
      />
      <ul style={{ paddingLeft: 18, color: '#374151' }}>
        <li>Nguyen Van A - customer</li>
        <li>Tran Thi B - customer</li>
        <li>Admin Root - admin</li>
      </ul>
    </section>
  )
}

export default AdminUsersPage
