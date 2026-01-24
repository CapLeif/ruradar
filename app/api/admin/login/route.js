import { NextResponse } from "next/server";

export async function POST(req) {
  const form = await req.formData();
  const password = String(form.get("password") || "");
  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }
  const res = NextResponse.redirect(new URL("/admin/dashboard", req.url));
  res.cookies.set("ruradar_admin", "1", { httpOnly: true, secure: true, sameSite: "lax", path: "/" });
  return res;
}
