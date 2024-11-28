import DaftarNasabahPage from "../components-page/daftar_nasabah_page";
import ErrorPage from "../components/errorPage";

export const dynamic = "force-dynamic";

const DaftarNasabah = async () => {
  try {
    const hostname = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

    const res = await fetch(`${hostname}/api/nasabah`);
    const data = await res.json();

    return <DaftarNasabahPage allNasabah={data.data} />;
  } catch (error) {
    return <ErrorPage err={error.message} statusCode={error.status} />;
  }
};

export default DaftarNasabah;
