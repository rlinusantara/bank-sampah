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

    let historyPenarikan = [];
    let isLogin = false;
    if (tokenName && tokenValue) {
      const res = await fetch(`${hostname}/api/admin/history-penarikan`, {
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
      historyPenarikan = data.data;

      isLogin = true;
    }

    return (
      <HistoryPenarikanPage
        historyPenarikan={historyPenarikan}
        isLogin={isLogin}
      />
    );
  } catch (error) {
    return <ErrorPage err={error.message} statusCode={error.status} />;
  }
};

export default HistoryPenarikan;
