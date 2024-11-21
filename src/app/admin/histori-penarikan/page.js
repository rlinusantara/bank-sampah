"use client";
import AdminLayout from "@/app/components/adminLayout";
import formatRupiah from "@/helpers/formatRupiah";
import axios from "axios";
import { useState, useEffect } from "react";
import format from "date-format";
import SpinnerLoading from "@/app/components/spinner";

const historiPenarikan = () => {
  const [historyPenarikan, setHistoryPenarikan] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(function () {
    axios.get("/api/admin/history-penarikan").then((res) => {
      setHistoryPenarikan(res.data.data);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <AdminLayout>
        <div className="w-[280px] ml-[73px]">
          <h1 className="text-center text-xl font-bold p-2">
            Riwayat Penarikan
          </h1>
          <div className="relative">
            <table className="w-full text-sm rtl:text-right text-gray-500 table-fixed text-center">
              <thead className="text-xs text-gray-700 bg-accent ">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Nama
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Tanggal
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Jumlah
                  </th>
                </tr>
              </thead>
              <tbody>
                {historyPenarikan.map((v, i) => (
                  <tr key={i} className="bg-white border-b">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {v.nama}
                    </th>
                    <td className="px-6 py-4">
                      {format(
                        "dd:MM:yyyy",
                        new Date(v.setoran_keluar.tanggal_setoran_keluar)
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {formatRupiah(v.setoran_keluar.tabungan_keluar)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {isLoading ? (
              <section className="flex justify-center items-center mt-2">
                <SpinnerLoading />
              </section>
            ) : (
              ""
            )}
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default historiPenarikan;
