import { supabasePublic } from "@/lib/supabasePublic";

export const revalidate = 60;

export default async function Tenders({ searchParams }) {
  const q = (searchParams?.q || "").trim();

  let query = supabasePublic
    .from("tenders")
    .select("id,title,organizer,deadline,created_at")
    .eq("status", "published")
    .order("created_at", { ascending: false })
    .limit(200);

  if (q) query = query.ilike("title", `%${q}%`);

  const { data, error } = await query;
  if (error) return <pre>{error.message}</pre>;

  return (
    <main>
      <h1 style={{ marginTop: 0 }}>订单列表</h1>
      <form>
        <input
          name="q"
          defaultValue={q}
          placeholder="搜索标题关键词"
          style={{ width: "100%", padding: 10, fontSize: 14 }}
        />
      </form>

      <div style={{ marginTop: 12, fontSize: 12, opacity: 0.7 }}>
        共 {(data || []).length} 条
      </div>

      <ul style={{ paddingLeft: 18 }}>
        {(data || []).map(t => (
          <li key={t.id} style={{ margin: "10px 0" }}>
            <a href={`/tender/${t.id}`} style={{ fontWeight: 700 }}>{t.title}</a>
            <div style={{ fontSize: 12, opacity: 0.75 }}>
              {t.organizer || "—"} · 截止 {t.deadline ? new Date(t.deadline).toLocaleString() : "—"}
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
