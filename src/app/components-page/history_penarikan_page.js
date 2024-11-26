"use client";
import AdminLayout from "@/app/components/adminLayout";
import formatRupiah from "@/helpers/formatRupiah";
import { useState, useEffect } from "react";
import format from "date-format";
import SpinnerLoading from "@/app/components/spinner";

const HistoryPenarikanPage = ({ historyPenarikan = [], isLogin = false }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(function () {
    if (historyPenarikan.length) {
      setIsLoading(false);
    } else {
      setIsLoading(false);
      setIsEmpty(true);
    }
  }, []);

  return (
    <>
      <AdminLayout isLogin={isLogin}>
          <h1 className="text-center text-xl font-bold p-2">
            Riwayat Penarikan
          </h1>
        <div className="w-[280px] ml-[73px] xl:w-full xl:ml-24">
          <div className="relative w-10/12">
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

            {isEmpty ? (
              <section className="flex justify-center">
                <p>Data kosong</p>
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

export default HistoryPenarikanPage;
