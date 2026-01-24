export default function Admin() {
  return (
    <main>
      <h1 style={{ marginTop: 0 }}>后台登录</h1>
      <form method="POST" action="/api/admin/login">
        <input
          name="password"
          type="password"
          placeholder="管理员密码"
          style={{ width: "100%", padding: 10, fontSize: 14 }}
        />
        <button style={{ marginTop: 10, padding: "10px 14px", fontWeight: 700 }}>
          登录
        </button>
      </form>

      <p style={{ fontSize: 12, opacity: 0.7 }}>
        先用环境变量 ADMIN_PASSWORD 控制，MVP 用；后面可换 Supabase Auth。
      </p>
    </main>
  );
}
