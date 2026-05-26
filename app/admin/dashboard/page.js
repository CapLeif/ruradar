import { tenders } from "@/lib/mockTenders";

export default function Dashboard() {
  return (
    <section className="detail-panel">
      <p className="eyebrow">本地原型</p>
      <h1>数据看板</h1>
      <p className="summary">
        第一阶段后台不接入数据库，这里只展示本地 mock 数据概览。后续接入真实数据后，可在这里扩展审核、发布和同步状态。
      </p>
      <div className="detail-meta">
        <article>
          <small>样例信息</small>
          <span>{tenders.length} 条</span>
        </article>
        <article>
          <small>数据来源</small>
          <span>本地 mock</span>
        </article>
        <article>
          <small>自动抓取</small>
          <span>暂未启用</span>
        </article>
      </div>
      <a className="source-button" href="/tenders">查看前台列表</a>
    </section>
  );
}
