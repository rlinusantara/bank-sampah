import HargaSampahPage from "@/app/components-page/harga_sampah_page";
import ErrorPage from "@/app/components/errorPage";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

const DraftSetoran = async () => {
  try {
    const cookieStore = cookies();
    const tokenName = (await cookieStore).has("secret");
    const tokenValue = (await cookieStore).get("secret")?.value;

    const hostname = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

    let defaultHarga = 0;

    let isLogin = false;
    if (tokenName && tokenValue) {
      const res = await fetch(`${hostname}/api/admin/harga-sampah`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: `secret=${tokenValue}`,
        },
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const data = await res.json();
      defaultHarga = data.data.harga_satuan;
      isLogin = true;
    }

    return <HargaSampahPage defaultHarga={defaultHarga} isLogin={isLogin} />;
  } catch (error) {
    return <ErrorPage err={error.message} statusCode={error.status} />;
  }
};

export default DraftSetoran;
