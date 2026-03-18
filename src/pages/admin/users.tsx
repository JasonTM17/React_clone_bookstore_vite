import { useEffect, useMemo, useState } from 'react'
import { Alert, Spin } from 'antd'
import CsvImportPanel from '../../components/admin/csv.import.panel'
import { getAdminUsers, type AdminUser } from '../../services/admin.service'

function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadUsers = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await getAdminUsers()
      setUsers(response)
    } catch (loadError) {
      const message = loadError instanceof Error ? loadError.message : 'Không thể tải danh sách người dùng'
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadUsers()
  }, [])

  const exportRows = useMemo(
    () =>
      users.map((user) => ({
        fullName: user.fullName || '',
        email: user.email || '',
        password: '123456',
        phone: user.phone || '',
      })),
    [users],
  )

  return (
    <section>
      <h2>Quản lý người dùng</h2>
      <CsvImportPanel
        title="Nhập / xuất nhân viên CSV"
        entityLabel="nhân viên"
        moduleKey="users"
        exportRows={exportRows}
        exportFileName="users-export.csv"
        onImportSuccess={loadUsers}
      />

      {error && (
        <Alert style={{ marginBottom: 12 }} type="error" showIcon message="Lỗi tải dữ liệu người dùng" description={error} />
      )}

      {isLoading ? (
        <div style={{ padding: 12 }}>
          <Spin />
        </div>
      ) : (
        <ul style={{ paddingLeft: 18, color: '#374151' }}>
          {users.map((user) => (
            <li key={user._id}>
              {user.fullName || '-'} - {(user.role || 'USER').toLowerCase()}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default AdminUsersPage
