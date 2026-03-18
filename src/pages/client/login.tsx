function LoginPage() {
  return (
    <section style={{ maxWidth: 420 }}>
      <h1>Đăng nhập</h1>
      <form style={{ display: 'grid', gap: 10 }}>
        <label>
          Email
          <input type="email" placeholder="you@example.com" style={{ width: '100%', padding: 8, marginTop: 4 }} />
        </label>
        <label>
          Mật khẩu
          <input type="password" placeholder="••••••••" style={{ width: '100%', padding: 8, marginTop: 4 }} />
        </label>
        <button type="button" style={{ padding: '10px 12px', cursor: 'pointer' }}>
          Đăng nhập
        </button>
      </form>
    </section>
  )
}

export default LoginPage
