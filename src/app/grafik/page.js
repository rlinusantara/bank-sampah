import GrafikPage from "../components-page/grafik_page";
import ErrorPage from "../components/errorPage";

export const dynamic = "force-dynamic";

const Grafik = async () => {
  try {
    const hostname = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

    const res = await fetch(`${hostname}/api/nasabah/grafik`);
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const data = await res.json();

    return (
      <GrafikPage
        nasabah={data.data[0]?.nama || []}
        totalTabungan={data.data[0]?.total_tabungan || []}
        totalSetoran={data.data[0]?.total_setoran || []}
        data={data.data}
      />
    );
  } catch (error) {
    return <ErrorPage err={error.message} statusCode={error.status} />;
  }
};

export default Grafik;
