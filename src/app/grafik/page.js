import HorizontalBarChart from "../components/barChart";
import Layout from "../components/layout";

const Grafik = () => {
  return (
    <>
      <Layout>
        <section className="px-4 mt-10 mb-20">
          <HorizontalBarChart />
        </section>

        <section className="flex justify-end w-full px-10 mb-10 cursor-pointer">
          <section className="w-24 border flex flex-col items-center justify-center rounded-sm border-gray-300">
            <img src="/excel.png" alt="exel" />
            <p className="font-medium text-sm">Export ke excel</p>
          </section>
        </section>
      </Layout>
    </>
  );
};

export default Grafik;
