import { Button, Card, Form, Input, Typography, message } from 'antd'
import { Link } from 'react-router-dom'
import { register, type RegisterPayload } from '../../services/auth.service'

function RegisterPage() {
  const [form] = Form.useForm<RegisterPayload & { confirmPassword: string }>()

  const handleSubmit = async (values: RegisterPayload & { confirmPassword: string }) => {
    try {
      await register({
        name: values.name,
        email: values.email,
        password: values.password,
      })
      message.success('Tạo tài khoản thành công')
      form.resetFields()
    } catch {
      message.error('Đăng ký thất bại. Vui lòng thử lại.')
    }
  }

  return (
    <section style={{ maxWidth: 460, margin: '0 auto' }}>
      <Card>
        <Typography.Title level={3} style={{ marginTop: 0 }}>
          Đăng ký tài khoản
        </Typography.Title>
        <Form form={form} layout="vertical" requiredMark={false} autoComplete="off" onFinish={handleSubmit}>
          <Form.Item label="Họ tên" name="name" rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}>
            <Input placeholder="Nguyen Van A" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Vui lòng nhập email' },
              { type: 'email', message: 'Email không hợp lệ' },
            ]}
          >
            <Input placeholder="you@example.com" />
          </Form.Item>

          <Form.Item label="Mật khẩu" name="password" rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }, { min: 6, message: 'Mật khẩu tối thiểu 6 ký tự' }]}>
            <Input.Password placeholder="••••••••" />
          </Form.Item>

          <Form.Item
            label="Xác nhận mật khẩu"
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Vui lòng xác nhận mật khẩu' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }

                  return Promise.reject(new Error('Mật khẩu xác nhận không khớp'))
                },
              }),
            ]}
          >
            <Input.Password placeholder="••••••••" />
          </Form.Item>

          <Form.Item style={{ marginBottom: 12 }}>
            <Typography.Text type="secondary">
              Đã có tài khoản?{' '}
              <Link to="/auth/login" style={{ color: '#1677ff' }}>
                Đăng nhập ngay
              </Link>
            </Typography.Text>
          </Form.Item>

          <Form.Item style={{ marginBottom: 0 }}>
            <Button type="primary" htmlType="submit" block>
              Tạo tài khoản
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </section>
  )
}

export default RegisterPage
