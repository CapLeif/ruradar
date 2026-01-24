import { supabasePublic } from "@/lib/supabasePublic";

export const revalidate = 60;

export default async function Home() {
  const { data, error } = await supabasePublic
    .from("tenders")
    .select("id,title,organizer,deadline,created_at,status")
    .eq("status", "published")
    .order("created_at", { ascending: false })
    .limit(20);

  if (error) return <pre>{error.message}</pre>;

  return (
    <main>
      <h1 style={{ marginTop: 0 }}>最新订单</h1>
      <ul style={{ paddingLeft: 18 }}>
        {(data || []).map(t => (
          <li key={t.id} style={{ marginBottom: 10 }}>
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
