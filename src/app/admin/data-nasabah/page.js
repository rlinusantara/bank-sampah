import DataNasabahPage from "@/app/components-page/data_nasabah_page";
import ErrorPage from "@/app/components/errorPage";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

const DataNasabah = async () => {
  try {
    const cookieStore = cookies();
    const tokenName = (await cookieStore).has("secret");
    const tokenValue = (await cookieStore).get("secret")?.value;

    const hostname = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

    let nasabahInit = [];
    let isLogin = false;
    if (tokenName && tokenValue) {
      const res = await fetch(`${hostname}/api/admin/nasabah`, {
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
        nasabahInit = (await res.json()).data;
        isLogin = true;
      }
    }

    return <DataNasabahPage nasabahInit={nasabahInit} isLogin={isLogin} />;
  } catch (error) {
    return <ErrorPage err={error.message} statusCode={error.status} />;
  }
};

export default DataNasabah;
