import TambahDataPage from "../components-page/tambah_data_page";
import ErrorPage from "../components/errorPage";

export const dynamic = "force-dynamic";

const TambahData = async () => {
  try {
    const hostname = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

    const res = await fetch(`${hostname}/api/nasabah`);
    const data = await res.json();

    const p = data.data.map((item) => ({
      label: item.nama,
      value: item._id,
    }));

    return <TambahDataPage nasabah={p} hargaSatuan={data.harga_satuan} />;
  } catch (error) {
    return <ErrorPage err={error.message} statusCode={error.status} />;
  }
};

export default TambahData;
