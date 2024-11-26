import DashboardPage from "@/app/components-page/dashboard_page";
import SpinnerLoading from "@/app/components/spinner";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

const Dashboard = async () => {
  try {
    const cookieStore = cookies();
    const tokenName = (await cookieStore).has("secret");
    const tokenValue = (await cookieStore).get("secret")?.value;

    let isLogin = false;
    if (tokenName && tokenValue) {
      isLogin = true;
    }

    return <DashboardPage isLogin={isLogin} />;
  } catch (err) {
    console.error("Error fetching data:", err);
    return <SpinnerLoading />;
  }
};

export default Dashboard;
