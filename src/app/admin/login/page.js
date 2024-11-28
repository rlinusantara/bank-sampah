import LoginPage from "@/app/components-page/login_page";
import ErrorPage from "@/app/components/errorPage";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

const Login = async () => {
  try {
    const cookieStore = cookies();
    const tokenName = (await cookieStore).has("secret");
    const tokenValue = (await cookieStore).get("secret")?.value;

    let isLogin = false;
    if (tokenName && tokenValue) {
      isLogin = true;
    }

    return <LoginPage isLogin={isLogin} />;
  } catch (error) {
    return <ErrorPage err={error.message} statusCode={error.status} />;
  }
};

export default Login;
