"use client";
import HorizontalBarChart from "../components/barChart";
import Layout from "../components/layout";
import * as XLSX from "xlsx";

const Grafik = () => {
  const exportToExcel = () => {
    const wb = XLSX.utils.book_new();

    const data = [
      { name: "Alice", age: 25, city: "New York" },
      { name: "Bob", age: 30, city: "Los Angeles" },
      { name: "Charlie", age: 35, city: "Chicago" },
    ];
    const ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "data.xlsx");
  };
  return (
    <>
      <Layout>
        <section className="px-4 mt-10 mb-20">
          <HorizontalBarChart />
        </section>

        <section
          className="flex justify-end w-full px-10 mb-10 cursor-pointer"
          onClick={exportToExcel}
        >
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
