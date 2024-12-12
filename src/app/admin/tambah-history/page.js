import { cookies } from "next/headers";
import ErrorPage from "@/app/components/errorPage";
import TambahDataHistoryAdminPage from "@/app/components-page/tambah_history_admin_page";

export const dynamic = "force-dynamic";

const TambahHistory = async () => {
  try {
    const cookieStore = cookies();
    const tokenName = (await cookieStore).has("secret");
    const tokenValue = (await cookieStore).get("secret")?.value;

    const hostname = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

    let nasabah = [];
    let hargaSatuan = 0;
    let isLogin = false;
    if (tokenName && tokenValue) {
      const res = await fetch(`${hostname}/api/nasabah`);
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const data = await res.json();

      const p = data.data.map((item) => ({
        label: item.nama,
        value: item._id,
      }));

      nasabah = p;
      hargaSatuan = data.harga_satuan;

      isLogin = true;
    }

    return (
      <TambahDataHistoryAdminPage
        nasabah={nasabah}
        hargaSatuan={hargaSatuan}
        isLogin={isLogin}
      />
    );
  } catch (error) {
    return <ErrorPage err={error.message} statusCode={error.status} />;
  }
};

export default TambahHistory;