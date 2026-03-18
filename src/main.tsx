/* eslint-disable react-refresh/only-export-components */
import { lazy, StrictMode, Suspense, type ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import 'antd/dist/reset.css'
import './styles/global.scss'

const AdminLayout = lazy(() => import('./components/admin/admin.layout'))
const ClientLayout = lazy(() => import('./components/layout/client.layout'))
const AdminBooksPage = lazy(() => import('./pages/admin/books'))
const AdminDashboardPage = lazy(() => import('./pages/admin/dashboard'))
const AdminOrdersPage = lazy(() => import('./pages/admin/orders'))
const AdminUsersPage = lazy(() => import('./pages/admin/users'))
const AboutPage = lazy(() => import('./pages/client/about'))
const BookDetailPage = lazy(() => import('./pages/client/book.detail'))
const BookPage = lazy(() => import('./pages/client/book'))
const CartPage = lazy(() => import('./pages/client/cart'))
const HomePage = lazy(() => import('./pages/client/home'))
const LoginPage = lazy(() => import('./pages/client/login'))
const NotFoundPage = lazy(() => import('./pages/client/not-found'))
const RegisterPage = lazy(() => import('./pages/client/register'))
const AuthLoginPage = lazy(() => import('./pages/client/auth/login'))
const AuthRegisterPage = lazy(() => import('./pages/client/auth/register'))

const withSuspense = (element: ReactNode) => (
  <Suspense fallback={<div style={{ padding: 24 }}>Loading...</div>}>{element}</Suspense>
)

const router = createBrowserRouter([
  {
    path: '/',
    element: withSuspense(<ClientLayout />),
    children: [
      {
        index: true,
        element: withSuspense(<HomePage />),
      },
      {
        path: '/book',
        element: withSuspense(<BookPage />),
      },
      {
        path: '/book/:bookId',
        element: withSuspense(<BookDetailPage />),
      },
      {
        path: '/about',
        element: withSuspense(<AboutPage />),
      },
      {
        path: '/cart',
        element: withSuspense(<CartPage />),
      },
      {
        path: '/login',
        element: withSuspense(<LoginPage />),
      },
      {
        path: '/auth/login',
        element: withSuspense(<AuthLoginPage />),
      },
      {
        path: '/register',
        element: withSuspense(<RegisterPage />),
      },
      {
        path: '/auth/register',
        element: withSuspense(<AuthRegisterPage />),
      },
      {
        path: '*',
        element: withSuspense(<NotFoundPage />),
      },
    ],
  },
  {
    path: '/admin',
    element: withSuspense(<AdminLayout />),
    children: [
      {
        index: true,
        element: withSuspense(<AdminDashboardPage />),
      },
      {
        path: '/admin/books',
        element: withSuspense(<AdminBooksPage />),
      },
      {
        path: '/admin/orders',
        element: withSuspense(<AdminOrdersPage />),
      },
      {
        path: '/admin/users',
        element: withSuspense(<AdminUsersPage />),
      },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
