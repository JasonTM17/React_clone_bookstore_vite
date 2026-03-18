import { Button, Card, Checkbox, Form, Input, Typography, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { login, type LoginPayload } from '../../services/auth.service'
import { getAuthUser, isAdminUser } from '../../services/auth-storage'

function LoginPage() {
  const [form] = Form.useForm<LoginPayload>()
  const navigate = useNavigate()

  const handleSubmit = async (values: LoginPayload) => {
    try {
      await login(values)
      message.success('Đăng nhập thành công')
      form.resetFields()

      const user = getAuthUser()
      navigate(isAdminUser(user) ? '/admin' : '/')
    } catch {
      message.error('Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.')
    }
  }

  return (
    <section style={{ maxWidth: 460, margin: '0 auto' }}>
      <Card>
        <Typography.Title level={3} style={{ marginTop: 0 }}>
          Đăng nhập
        </Typography.Title>
        <Form form={form} layout="vertical" requiredMark={false} autoComplete="off" onFinish={handleSubmit}>
          <Form.Item
            label="Email hoặc số điện thoại"
            name="username"
            rules={[
              { required: true, message: 'Vui lòng nhập email hoặc số điện thoại' },
            ]}
          >
            <Input placeholder="you@example.com / 0912345678" />
          </Form.Item>

          <Form.Item label="Mật khẩu" name="password" rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}>
            <Input.Password placeholder="••••••••" />
          </Form.Item>

          <Form.Item>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Checkbox>Ghi nhớ đăng nhập</Checkbox>
              <Link to="/auth/register" style={{ color: '#1677ff' }}>
                Tạo tài khoản
              </Link>
            </div>
          </Form.Item>

          <Form.Item style={{ marginBottom: 0 }}>
            <Button type="primary" htmlType="submit" block>
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </section>
  )
}

export default LoginPage
