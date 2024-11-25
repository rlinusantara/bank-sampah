import HistorySetoranPage from "@/app/components-page/history_setoran_page";
import SpinnerLoading from "@/app/components/spinner";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

const HistorySetoran = async () => {
  try {
    const cookieStore = cookies();
    const tokenName = (await cookieStore).has("secret");
    const tokenValue = (await cookieStore).get("secret").value;

    const hostname = process.env.VERCEL_URL || "http://localhost:3000";

    const res = await fetch(`${hostname}/api/admin/history-setoran`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `secret=${tokenValue}`,
      },
      credentials: "include",
    });
    const data = await res.json();

    let isLogin = false;
    if (tokenName && tokenValue) {
      isLogin = true;
    }

    return <HistorySetoranPage historySetoran={data.data} isLogin={isLogin} />;
  } catch (err) {
    console.error("Error fetching data:", err);
    return <SpinnerLoading />;
  }
};

export default HistorySetoran;
