import LoginPage from "@/app/components-page/login_page";
import ErrorPage from "@/app/components/errorPage";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

const Login = async () => {
  try {
    return <LoginPage isLogin={false} />;
  } catch (error) {
    return <ErrorPage err={error.message} statusCode={error.status} />;
  }
};

export default Login;
