import PenarikanUangPage from "@/app/components-page/penarikan_uang_page";
import ErrorPage from "@/app/components/errorPage";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

const DraftSetoran = async () => {
  try {
    const cookieStore = cookies();
    const tokenName = (await cookieStore).has("secret");
    const tokenValue = (await cookieStore).get("secret")?.value;

    const hostname = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

    let nasabahInit = [];
    let isLogin = false;
    if (tokenName && tokenValue) {
      const res = await fetch(`${hostname}/api/nasabah`);
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const data = await res.json();

      const p = data.data.map((item) => {
        return {
          label: item.nama,
          value: item._id,
          saldo: item.total_tabungan,
        };
      });
      nasabahInit = p;
      isLogin = true;
    }

    return <PenarikanUangPage nasabahInit={nasabahInit} isLogin={isLogin} />;
  } catch (error) {
    return <ErrorPage err={error.message} statusCode={error.status} />;
  }
};

export default DraftSetoran;
