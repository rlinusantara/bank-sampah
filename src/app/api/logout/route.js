import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.set("secret", "", {
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 0,
    priority: "high",
  });

  return Response.json({ message: "Berhasil logout" }, { status: 200 });
}
