import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import AdminLayout from './components/admin/admin.layout'
import ClientLayout from './components/layout/client.layout'
import AdminBooksPage from './pages/admin/books'
import AdminDashboardPage from './pages/admin/dashboard'
import AdminOrdersPage from './pages/admin/orders'
import AdminUsersPage from './pages/admin/users'
import AboutPage from './pages/client/about'
import BookDetailPage from './pages/client/book.detail'
import BookPage from './pages/client/book'
import CartPage from './pages/client/cart'
import HomePage from './pages/client/home'
import LoginPage from './pages/client/login'
import NotFoundPage from './pages/client/not-found'
import RegisterPage from './pages/client/register'

const router = createBrowserRouter([
  {
    path: '/',
    element: <ClientLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: '/book',
        element: <BookPage />,
      },
      {
        path: '/book/:bookId',
        element: <BookDetailPage />,
      },
      {
        path: '/about',
        element: <AboutPage />,
      },
      {
        path: '/cart',
        element: <CartPage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/register',
        element: <RegisterPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <AdminDashboardPage />,
      },
      {
        path: '/admin/books',
        element: <AdminBooksPage />,
      },
      {
        path: '/admin/orders',
        element: <AdminOrdersPage />,
      },
      {
        path: '/admin/users',
        element: <AdminUsersPage />,
      },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
