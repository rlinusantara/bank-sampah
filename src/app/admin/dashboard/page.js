import DashboardPage from "@/app/components-page/dashboard_page";
import SpinnerLoading from "@/app/components/spinner";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

const Dashboard = async () => {
  try {
    const cookieStore = cookies();
    const tokenName = (await cookieStore).has("secret");
    const tokenValue = (await cookieStore).get("secret")?.value;

    const hostname = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

    const res = await fetch(`${hostname}/api/admin/counting`, {
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

    return <DashboardPage counting={data.data[0] || {}} isLogin={isLogin} />;
  } catch (err) {
    console.error("Error fetching data:", err);
    return <SpinnerLoading />;
  }
};

export default Dashboard;
