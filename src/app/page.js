import connectDB from "@/db/connection";
import Main from "./components/home";
import ErrorPage from "./components/errorPage";
export default async function Home() {
  try {
    await connectDB();

    return <Main />;
  } catch (error) {
    return <ErrorPage err={error.message} statusCode={error.status} />;
  }
}
