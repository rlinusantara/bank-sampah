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

    const res = await fetch(`${hostname}/api/nasabah`);
    const data = await res.json();

    const p = data.data.map((item) => {
      return {
        label: item.nama,
        value: item._id,
        saldo: item.total_tabungan,
      };
    });

    let isLogin = false;
    if (tokenName && tokenValue) {
      isLogin = true;
    }

    return <PenarikanUangPage nasabahInit={p} isLogin={isLogin} />;
  } catch (error) {
    return <ErrorPage err={error.message} statusCode={error.status} />;
  }
};

export default DraftSetoran;
