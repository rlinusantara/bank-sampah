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

    if (tokenName && tokenValue) {
      const res = await fetch(`${hostname}/api/admin/counting`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: `secret=${tokenValue}`,
        },
        credentials: "include",
      });

      counting = (await res.json()).data[0];

      isLogin = true;
    }

    return <DashboardPage counting={counting} isLogin={isLogin} />;
  } catch (error) {
    return <ErrorPage err={error.message} statusCode={error.status} />;
  }
};

export default Dashboard;
