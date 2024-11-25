import About from "../components/about";
import SpinnerLoading from "../components/spinner";

const Hello = async ({ searchParams }) => {
  try {
    const hostname = process.env.VERCEL_URL || "http://localhost:3000/api";

    const res = await fetch(hostname);
    const data = await res.json();

    return <About data={data} />;
  } catch (err) {
    console.error("Error fetching data:", err);
    return <SpinnerLoading />;
  }
};

export default Hello;
