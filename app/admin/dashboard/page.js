import { cookies } from "next/headers";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const dynamic = "force-dynamic";

function mustAuth() {
  const c = cookies().get("ruradar_admin");
  if (!c || c.value !== "1") throw new Error("UNAUTHORIZED");
}

export default async function Dashboard() {
  try { mustAuth(); } catch { return <a href="/admin">未登录，去登录</a>; }

  const { data, error } = await supabaseAdmin
    .from("tenders")
    .select("id,title,status,created_at")
    .order("created_at", { ascending: false })
    .limit(200);

  if (error) return <pre>{error.message}</pre>;

  return (
    <main>
      <h1 style={{ marginTop: 0 }}>订单管理</h1>
      <a href="/admin/new">+ 新建订单</a>
      <ul style={{ paddingLeft: 18, marginTop: 12 }}>
        {(data || []).map(t => (
          <li key={t.id} style={{ marginBottom: 8 }}>
            <a href={`/admin/edit/${t.id}`} style={{ fontWeight: 700 }}>{t.title}</a>
            <span style={{ fontSize: 12, opacity: 0.7 }}> · {t.status}</span>
          </li>
        ))}
      </ul>
    </main>
  );
}
