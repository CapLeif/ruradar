import { categories, tenders } from "@/lib/mockTenders";
import TenderList from "./tenders/TenderList";

export default function Home() {
  const activeCount = tenders.filter((tender) => new Date(tender.deadline) > new Date()).length;

  const latest = [...tenders]
    .sort((a, b) => new Date(b.publishTime) - new Date(a.publishTime))
    .slice(0, 8);

  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">B2B-Center 公开招投标信息中文索引</p>
          <h1>俄罗斯采购机会，一屏筛选。</h1>
          <p>
            以中文方式整理俄语采购信息，保留源站编号、分类、发布时间、截止时间与原始链接，方便业务团队快速判断跟进优先级。
          </p>
          <div className="hero-actions">
            <a className="button" href="/tenders">查看信息列表</a>
            <a className="button secondary" href="https://www.b2b-center.ru/market/" target="_blank" rel="noreferrer">
              打开源站
            </a>
          </div>
        </div>
        <div className="stats" aria-label="平台统计">
          <article className="stat-card">
            <strong>{tenders.length}</strong>
            <span>本地样例信息</span>
          </article>
          <article className="stat-card">
            <strong>{activeCount}</strong>
            <span>仍可关注</span>
          </article>
          <article className="stat-card">
            <strong>{categories.length}</strong>
            <span>覆盖分类</span>
          </article>
          <article className="stat-card">
            <strong>{latest[0]?.publishTime ? new Date(latest[0].publishTime).toISOString().slice(0, 10) : "暂无数据"}</strong>
            <span>最新数据日期</span>
          </article>
        </div>
      </section>

      <div className="section-head">
        <div>
          <h2>最新招投标信息</h2>
          <p>支持关键词和分类筛选，详情页保留源站链接。</p>
        </div>
        <a className="source-button" href="/tenders">进入完整列表</a>
      </div>

      <TenderList initialTenders={latest} />
    </>
  );
}
