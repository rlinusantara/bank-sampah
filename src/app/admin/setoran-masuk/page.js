import TambahDataPage from "@/app/components-page/tambah_data_page";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

const SetoranMasuk = async () => {
  try {
    const cookieStore = cookies();
    const tokenName = (await cookieStore).has("secret");
    const tokenValue = (await cookieStore).get("secret").value;

    const hostname = process.env.VERCEL_URL || "http://localhost:3000";

    const res = await fetch(`${hostname}/api/nasabah`);
    const data = await res.json();

    const p = data.data.map((item) => ({
      label: item.nama,
      value: item._id,
    }));

    let isLogin = false;
    if (tokenName && tokenValue) {
      isLogin = true;
    }

    return (
      <TambahDataPage
        nasabah={p}
        hargaSatuan={data.harga_satuan}
        isLogin={isLogin}
      />
    );
  } catch (err) {
    console.error("Error fetching data:", err);
    return <TambahDataPage />;
  }
};

export default SetoranMasuk;
