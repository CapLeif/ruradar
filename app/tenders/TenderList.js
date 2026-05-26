"use client";

import { useMemo, useState } from "react";

function formatDate(value) {
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(value));
}

function isActive(tender) {
  return new Date(tender.deadline) > new Date();
}

function compareDate(field, direction) {
  return (a, b) => {
    const diff = new Date(a[field]) - new Date(b[field]);
    return direction === "asc" ? diff : -diff;
  };
}

export default function TenderList({ initialTenders }) {
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("publish-desc");

  const categories = useMemo(
    () =>
      Array.from(new Set(initialTenders.map((tender) => tender.category))).sort((a, b) =>
        a.localeCompare(b, "zh-CN")
      ),
    [initialTenders]
  );

  const filtered = useMemo(() => {
    const normalizedKeyword = keyword.trim().toLowerCase();
    const result = initialTenders.filter((tender) => {
      const haystack = [
        tender.id,
        tender.title,
        tender.originalTitle,
        tender.category,
        tender.procurementType,
        tender.organizer,
        tender.region,
        tender.summary
      ]
        .join(" ")
        .toLowerCase();

      return (!normalizedKeyword || haystack.includes(normalizedKeyword)) &&
        (!category || tender.category === category);
    });

    if (sort === "deadline-asc") return result.sort(compareDate("deadline", "asc"));
    if (sort === "deadline-desc") return result.sort(compareDate("deadline", "desc"));
    return result.sort(compareDate("publishTime", "desc"));
  }, [category, initialTenders, keyword, sort]);

  return (
    <>
      <section className="toolbar" aria-label="筛选招投标信息">
        <div className="field">
          <label htmlFor="keyword">关键词搜索</label>
          <input
            id="keyword"
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            placeholder="输入产品、公司、分类、地区或编号"
            type="search"
          />
        </div>
        <div className="field">
          <label htmlFor="category">分类筛选</label>
          <select id="category" value={category} onChange={(event) => setCategory(event.target.value)}>
            <option value="">全部分类</option>
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="sort">排序</label>
          <select id="sort" value={sort} onChange={(event) => setSort(event.target.value)}>
            <option value="publish-desc">最新发布</option>
            <option value="deadline-asc">最早截止</option>
            <option value="deadline-desc">最晚截止</option>
          </select>
        </div>
      </section>

      <div className="section-head">
        <div>
          <h2>信息列表</h2>
          <p>当前为本地 JSON mock 数据，字段按后续真实抓取接口设计。</p>
        </div>
        <span className="result-count">共 {filtered.length} 条</span>
      </div>

      {filtered.length ? (
        <section className="tender-grid">
          {filtered.map((tender) => (
            <a className="tender-card" href={`/tender/${tender.id}`} key={tender.id}>
              <div className="card-meta">
                <span className="badge">#{tender.id}</span>
                <span className="badge">{tender.category}</span>
                <span className="badge gold">{tender.procurementType}</span>
                <span className={isActive(tender) ? "badge" : "badge closed"}>
                  {isActive(tender) ? "可关注" : "已截止"}
                </span>
              </div>
              <h3>{tender.title}</h3>
              <p className="summary">{tender.summary}</p>
              <div className="info-grid">
                <div>
                  <small>采购方</small>
                  <span>{tender.organizer}</span>
                </div>
                <div>
                  <small>地区</small>
                  <span>{tender.region}</span>
                </div>
                <div>
                  <small>发布时间</small>
                  <span>{formatDate(tender.publishTime)}</span>
                </div>
                <div>
                  <small>截止时间</small>
                  <span>{formatDate(tender.deadline)}</span>
                </div>
              </div>
            </a>
          ))}
        </section>
      ) : (
        <div className="empty">没有匹配的信息，换个关键词或分类试试。</div>
      )}
    </>
  );
}
