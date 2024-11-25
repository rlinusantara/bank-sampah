import GrafikPage from "../components-page/grafik_page";
import SpinnerLoading from "../components/spinner";

export const dynamic = "force-dynamic";

const Grafik = async () => {
  try {
    const hostname = process.env.VERCEL_URL || "http://localhost:3000";

    const res = await fetch(`${hostname}/api/nasabah/grafik`);
    const data = await res.json();

    return (
      <GrafikPage
        nasabah={data.data[0]?.nama || []}
        totalTabungan={data.data[0]?.total_tabungan || []}
        totalSetoran={data.data[0]?.total_setoran || []}
        data={data.data}
      />
    );
  } catch (err) {
    console.error("Error fetching data:", err);
    return <SpinnerLoading />;
  }
};

export default Grafik;
