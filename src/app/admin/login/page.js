import LoginPage from "@/app/components-page/login_page";
import SpinnerLoading from "@/app/components/spinner";
import { cookies } from "next/headers";

const Login = async () => {
  try {
    const cookieStore = cookies();
    const tokenName = (await cookieStore).has("secret");
    const tokenValue = (await cookieStore).get("secret").value;

    let isLogin = false;
    if (tokenName && tokenValue) {
      isLogin = true;
    }

    return <LoginPage isLogin={isLogin} />;
  } catch (err) {
    console.error("Error fetching data:", err);
    return <SpinnerLoading />;
  }
};

export default Login;
