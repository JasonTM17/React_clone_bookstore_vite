function RegisterPage() {
  return (
    <section style={{ maxWidth: 420 }}>
      <h1>Đăng ký tài khoản</h1>
      <form style={{ display: 'grid', gap: 10 }}>
        <label>
          Họ tên
          <input type="text" placeholder="Nguyen Van A" style={{ width: '100%', padding: 8, marginTop: 4 }} />
        </label>
        <label>
          Email
          <input type="email" placeholder="you@example.com" style={{ width: '100%', padding: 8, marginTop: 4 }} />
        </label>
        <label>
          Mật khẩu
          <input type="password" placeholder="••••••••" style={{ width: '100%', padding: 8, marginTop: 4 }} />
        </label>
        <button type="button" style={{ padding: '10px 12px', cursor: 'pointer' }}>
          Tạo tài khoản
        </button>
      </form>
    </section>
  )
}

export default RegisterPage
