import TambahDataPage from "../components-page/tambah_data_page";

const TambahData = async () => {
  try {
    const hostname = process.env.VERCEL_URL || "http://localhost:3000";

    const res = await fetch(`${hostname}/api/nasabah`);
    const data = await res.json();

    return (
      <TambahDataPage nasabah={data.data} hargaSatuan={data.harga_satuan} />
    );
  } catch (err) {
    console.error("Error fetching data:", err);
    return <TambahDataPage />;
  }
};

export default TambahData;
