"use client";
import HorizontalBarChart from "../components/barChart";
import Layout from "../components/layout";
import * as XLSX from "xlsx";
import { useEffect, useState } from "react";
import SpinnerLoading from "../components/spinner";

const GrafikPage = ({
  totalTabungan = 0,
  totalSetoran = 0,
  nasabah = [],
  data = [],
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);
  const [excelShow, setExcelShow] = useState(false);

  useEffect(function () {
    setExcelShow(true);
    if (data.length === 0) {
      setExcelShow(false);
      setIsEmpty(true);
    }
    setIsLoading(false);
  }, []);

  const exportToExcel = () => {
    const wb = XLSX.utils.book_new();

    const data = [];
    for (let i = 0; i < nasabah.length; i++) {
      data.push({
        No: i + 1,
        Nama: nasabah[i],
        "Total Tabungan": totalTabungan[i],
        "Total Setoran": totalSetoran[i],
      });
    }

    const ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "data.xlsx");
  };
  return (
    <>
      <Layout>
        <section className="px-4 mt-10 mb-20">
          {isEmpty ? (
            <section className="text-center">
              <p>Data masih kosong</p>
            </section>
          ) : (
            <section>
              {isLoading ? (
                <section className="flex justify-center">
                  <SpinnerLoading />
                </section>
              ) : (
                <section className=" flex flex-col gap-40">
                  <section>
                    <p className="text-center font-bold text-2xl">
                      Grafik Total Tabungan
                    </p>
                    <HorizontalBarChart
                      dataTabungan={totalTabungan}
                      labels={nasabah}
                      text=""
                    />
                  </section>
                  <section>
                    <p className="text-center font-bold text-2xl">
                      Grafik Total Setoran
                    </p>
                    <HorizontalBarChart
                      dataTabungan={totalSetoran}
                      labels={nasabah}
                      text=""
                    />
                  </section>
                </section>
              )}
            </section>
          )}
        </section>

        {excelShow ? (
          <section
            className="flex justify-end w-full px-10 mb-10 cursor-pointer"
            onClick={exportToExcel}
          >
            <section className="w-24 border flex flex-col items-center justify-center rounded-sm border-gray-300">
              <img src="/excel.png" alt="exel" />
              <p className="font-medium text-sm">Export ke excel</p>
            </section>
          </section>
        ) : (
          ""
        )}
      </Layout>
    </>
  );
};

export default GrafikPage;
