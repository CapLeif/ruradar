export const metadata = {
  title: "俄贸雷达 | RuRadar",
  description: "俄罗斯外贸订单与采购情报"
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body style={{ fontFamily: "system-ui", margin: 0 }}>
        <div style={{ maxWidth: 980, margin: "0 auto", padding: 16 }}>
          <header style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <a href="/" style={{ fontWeight: 800, textDecoration: "none" }}>俄贸雷达</a>
            <a href="/tenders">订单</a>
            <a href="/admin">后台</a>
          </header>
          <hr style={{ margin: "12px 0" }} />
          {children}
          <hr style={{ margin: "24px 0 12px" }} />
          <footer style={{ fontSize: 12, opacity: 0.7 }}>
            © {new Date().getFullYear()} RuRadar
          </footer>
        </div>
      </body>
    </html>
  );
}
