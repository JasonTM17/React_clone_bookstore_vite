import { Outlet } from 'react-router-dom'
import AppFooter from './app.footer'
import AppHeader from './app.header'

function ClientLayout() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AppHeader />
      <main style={{ width: 'min(1120px, 92%)', margin: '24px auto', flex: 1 }}>
        <Outlet />
      </main>
      <AppFooter />
    </div>
  )
}

export default ClientLayout
