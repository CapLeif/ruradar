export const metadata = {
  title: "俄贸雷达 | RuRadar",
  description: "俄罗斯招投标与采购信息中文索引"
};

import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body>
        <div className="site-shell">
          <header className="site-header">
            <div className="site-header-inner">
              <a className="brand" href="/">
                <span className="brand-mark">R</span>
                <span>
                  <strong>俄贸雷达</strong>
                  <span>RuRadar</span>
                </span>
              </a>
              <nav className="nav" aria-label="主导航">
                <a href="/">首页</a>
                <a href="/tenders">招投标信息</a>
              </nav>
            </div>
          </header>
          <main className="site-main">
          {children}
          </main>
          <footer className="site-footer">
            © {new Date().getFullYear()} RuRadar · 本阶段使用本地 mock 数据，源站链接保留用于人工复核。
          </footer>
        </div>
      </body>
    </html>
  );
}
