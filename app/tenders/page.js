import { tenders } from "@/lib/mockTenders";
import TenderList from "./TenderList";

export default function Tenders() {
  return (
    <>
      <div className="section-head">
        <div>
          <p className="eyebrow">本地 mock 数据原型</p>
          <h1>招投标信息库</h1>
          <p>按关键词、行业分类和时间维度快速筛选俄罗斯采购机会。</p>
        </div>
        <a className="source-button" href="https://www.b2b-center.ru/market/" target="_blank" rel="noreferrer">
          查看源站
        </a>
      </div>
      <TenderList initialTenders={tenders} />
    </>
  );
}
