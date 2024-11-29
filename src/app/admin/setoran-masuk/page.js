import TambahDataAdminPage from "@/app/components-page/tambah_data_admin_page";
import { cookies } from "next/headers";
import ErrorPage from "@/app/components/errorPage";

export const dynamic = "force-dynamic";

const SetoranMasuk = async () => {
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
      <TambahDataAdminPage
        nasabah={nasabah}
        hargaSatuan={hargaSatuan}
        isLogin={isLogin}
      />
    );
  } catch (error) {
    return <ErrorPage err={error.message} statusCode={error.status} />;
  }
};

export default SetoranMasuk;
