import DashboardPage from "@/app/components-page/dashboard_page";
import ErrorPage from "@/app/components/errorPage";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

const Dashboard = async () => {
  try {
    const cookieStore = cookies();
    const tokenName = (await cookieStore).has("secret");
    const tokenValue = (await cookieStore).get("secret")?.value;

    const hostname = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

    let isLogin = false;

    let counting = {};
    let grafikTotalSetoran = [];
    let tahun = [];
    let dataGrafik = [];

    if (tokenName && tokenValue) {
      const res = await fetch(`${hostname}/api/admin/counting`, {
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
        const getGrafik = await fetch(
          `${hostname}/api/admin/grafik-total-setoran`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Cookie: `secret=${tokenValue}`,
            },
            credentials: "include",
          }
        );

        if (!getGrafik.ok) {
          throw new Error(`HTTP error! Status: ${getGrafik.status}`);
        }

        grafikTotalSetoran = await getGrafik.json();
        counting = (await res.json()).data[0];
        tahun = grafikTotalSetoran?.data[0]?.tahun[0]?.list_tahun || [];
        dataGrafik = grafikTotalSetoran?.data[0]?.data || [];

        isLogin = true;
      }
    }

    return (
      <DashboardPage
        counting={counting}
        isLogin={isLogin}
        tahun={tahun}
        grafikTotalSetoran={dataGrafik}
      />
    );
  } catch (error) {
    return <ErrorPage err={error.message} statusCode={error.status} />;
  }
};

export default Dashboard;
