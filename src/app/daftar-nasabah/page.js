import DaftarNasabahPage from "../components-page/daftar_nasabah_page";
import SpinnerLoading from "../components/spinner";

const DaftarNasabah = async () => {
  try {
    const hostname = process.env.VERCEL_URL || "http://localhost:3000";

    const res = await fetch(`${hostname}/api/nasabah`);
    const data = await res.json();

    return <DaftarNasabahPage allNasabah={data.data} />;
  } catch (err) {
    console.error("Error fetching data:", err);
    return <SpinnerLoading />;
  }
};

export default DaftarNasabah;
