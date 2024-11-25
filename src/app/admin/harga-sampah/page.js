import HargaSampahPage from "@/app/components-page/harga_sampah_page";
import SpinnerLoading from "@/app/components/spinner";
import { cookies } from "next/headers";

const DraftSetoran = async () => {
  try {
    const cookieStore = cookies();
    const tokenName = (await cookieStore).has("secret");
    const tokenValue = (await cookieStore).get("secret").value;

    const hostname = process.env.VERCEL_URL || "http://localhost:3000";

    const res = await fetch(`${hostname}/api/admin/harga-sampah`, {
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

    return (
      <HargaSampahPage
        defaultHarga={data.data.harga_satuan}
        isLogin={isLogin}
      />
    );
  } catch (err) {
    console.error("Error fetching data:", err);
    return <SpinnerLoading />;
  }
};

export default DraftSetoran;
