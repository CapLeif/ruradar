import { getTenderById, tenders } from "@/lib/mockTenders";

export function generateStaticParams() {
  return tenders.map((tender) => ({ id: tender.id }));
}

function formatDate(value) {
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(value));
}

export default async function TenderDetail({ params }) {
  const { id } = await params;
  const tender = getTenderById(id);

  if (!tender) {
    return (
      <section className="detail-panel">
        <a className="back-link" href="/tenders">返回列表</a>
        <h1>未找到该信息</h1>
        <p className="summary">请返回列表重新选择。</p>
      </section>
    );
  }

  return (
    <section className="detail-panel">
      <div className="detail-actions">
        <a className="back-link" href="/tenders">返回列表</a>
        <a className="source-button" href={tender.sourceUrl} target="_blank" rel="noreferrer">
          打开源站
        </a>
      </div>
      <div className="tag-row">
        <span className="badge">#{tender.id}</span>
        <span className="badge">{tender.category}</span>
        <span className="badge gold">{tender.procurementType}</span>
      </div>
      <h1>{tender.title}</h1>
      <p className="summary">{tender.summary}</p>

      <div className="detail-meta">
        <article>
          <small>采购方</small>
          <span>{tender.organizer}</span>
        </article>
        <article>
          <small>地区</small>
          <span>{tender.region}</span>
        </article>
        <article>
          <small>分类</small>
          <span>{tender.category}</span>
        </article>
        <article>
          <small>采购类型</small>
          <span>{tender.procurementType}</span>
        </article>
        <article>
          <small>发布时间</small>
          <span>{formatDate(tender.publishTime)}</span>
        </article>
        <article>
          <small>截止时间</small>
          <span>{formatDate(tender.deadline)}</span>
        </article>
      </div>

      <div className="original-block">
        <strong>源站原文标题</strong>
        <p>{tender.originalTitle}</p>
      </div>
    </section>
  );
}
