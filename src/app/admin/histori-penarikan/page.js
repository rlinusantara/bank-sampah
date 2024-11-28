import HistoryPenarikanPage from "@/app/components-page/history_penarikan_page";
import ErrorPage from "@/app/components/errorPage";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

const HistoryPenarikan = async () => {
  try {
    const cookieStore = cookies();
    const tokenName = (await cookieStore).has("secret");
    const tokenValue = (await cookieStore).get("secret")?.value;

    const hostname = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

    const res = await fetch(`${hostname}/api/admin/history-penarikan`, {
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

    return (
      <HistoryPenarikanPage historyPenarikan={data.data} isLogin={isLogin} />
    );
  } catch (error) {
    return <ErrorPage err={error.message} statusCode={error.status} />;
  }
};

export default HistoryPenarikan;
