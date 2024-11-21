"use client";
import HorizontalBarChart from "../components/barChart";
import Layout from "../components/layout";
import * as XLSX from "xlsx";
import axios from "axios";
import { useEffect, useState } from "react";
import SpinnerLoading from "../components/spinner";

const Grafik = () => {
  const [nasabah, setNasabah] = useState([]);
  const [totalTabungan, setTotalTabungan] = useState([]);
  const [totalSetoran, setTotalSetoran] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);
  const [excelShow, setExcelShow] = useState(false);

  useEffect(function () {
    axios.get("/api/nasabah/grafik").then((res) => {
      setExcelShow(true);
      if (res.data.data.length === 0) {
        setExcelShow(false);
        setIsEmpty(true);
      }
      setIsLoading(false);
      setNasabah(res.data.data[0]?.nama || []);
      setTotalTabungan(res.data.data[0]?.total_tabungan || []);
      setTotalSetoran(res.data.data[0]?.total_setoran || []);
    });
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
                  <HorizontalBarChart
                    dataTabungan={totalTabungan}
                    labels={nasabah}
                    text="Grafik Tabungan Customer"
                  />
                  <HorizontalBarChart
                    dataTabungan={totalSetoran}
                    labels={nasabah}
                    text="Grafik Total Setoran"
                  />
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

export default Grafik;
