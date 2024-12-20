import PenyimpananPage from "@/app/components-page/penyimpanan_page";
import ErrorPage from "@/app/components/errorPage";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";
const Penyimpanan = async () => {
  try {
    const cookieStore = cookies();
    const tokenName = (await cookieStore).has("secret");
    const tokenValue = (await cookieStore).get("secret")?.value;

    const hostname = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

    let data = {};
    let isLogin = false;
    if (tokenName && tokenValue) {
      const res = await fetch(`${hostname}/api/admin/storage-database`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: `secret=${tokenValue}`,
        },
        credentials: "include",
      });

      if (res.status >= 500) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      if (res.ok) {
        data = (await res.json()).data;
        isLogin = true;
      }
    }

    return <PenyimpananPage isLogin={isLogin} data={data} />;
  } catch (error) {
    return <ErrorPage err={error.message} statusCode={error.status} />;
  }
};

export default Penyimpanan;
