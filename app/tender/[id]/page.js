import { supabasePublic } from "@/lib/supabasePublic";

export const revalidate = 60;

function formatWechatText(t, siteUrl) {
  const url = `${siteUrl}/tender/${t.id}`;
  return [
    `📌 俄罗斯采购询单`,
    `【${t.title}】`,
    ``,
    `🏢 采购方：${t.organizer || "—"}`,
    `📦 采购类型：${t.procurement_type || "—"}`,
    `💰 预算：${t.budget ? String(t.budget) : "—"} ${t.currency || ""}`.trim(),
    ``,
    `⏰ 发布时间：${t.publish_time ? new Date(t.publish_time).toLocaleString() : "—"}`,
    `⏳ 截止时间：${t.deadline ? new Date(t.deadline).toLocaleString() : "—"}`,
    ``,
    `🔗 详情页：${url}`,
  ].join("\n");
}

export default async function TenderDetail({ params }) {
  const { id } = params;
  const { data: t, error } = await supabasePublic
    .from("tenders")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return <pre>{error.message}</pre>;
  if (!t) return <div>Not found</div>;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ruradar.com";
  const wechat = formatWechatText(t, siteUrl);

  return (
    <main>
      <h1 style={{ marginTop: 0 }}>{t.title}</h1>

      <div style={{ fontSize: 13, lineHeight: 1.7, opacity: 0.85 }}>
        <div><b>采购方：</b>{t.organizer || "—"}</div>
        <div><b>类型：</b>{t.procurement_type || "—"}</div>
        <div><b>预算：</b>{t.budget ? String(t.budget) : "—"} {t.currency || ""}</div>
        <div><b>发布时间：</b>{t.publish_time ? new Date(t.publish_time).toLocaleString() : "—"}</div>
        <div><b>截止时间：</b>{t.deadline ? new Date(t.deadline).toLocaleString() : "—"}</div>
        <div><b>来源链接：</b>{t.source_url ? <a href={t.source_url} target="_blank">打开</a> : "—"}</div>
      </div>

      <h3>中文摘要</h3>
      <pre style={{ whiteSpace: "pre-wrap", background: "#f6f6f6", padding: 12, borderRadius: 8 }}>
        {t.content_cn || "—"}
      </pre>

      <h3>公众号短文（复制粘贴）</h3>
      <textarea
        readOnly
        value={wechat}
        style={{ width: "100%", height: 200, padding: 10, fontSize: 13 }}
      />
      <button
        onClick={() => navigator.clipboard.writeText(wechat)}
        style={{ marginTop: 8, padding: "10px 14px", fontWeight: 700 }}
      >
        一键复制
      </button>
    </main>
  );
}
