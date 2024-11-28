import connectDB from "@/db/connection";
import Main from "./components/home";
export default async function Home() {
  await connectDB();

  return (
    <>
      <Main />
    </>
  );
}
