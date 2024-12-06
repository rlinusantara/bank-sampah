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
        <div className="w-[300px] ml-[73px] xl:w-[900px] xl:ml-20">
          <h1 className="text-center text-xl font-bold p-2">
            Riwayat Penarikan
          </h1>
          <div className="relative xl:w-full">
            <table className="w-full text-sm rtl:text-right text-gray-500 text-left">
              <thead className="text-xs text-gray-700 bg-accent ">
                <tr>
                <th scope="col" className="px-2 py-2">
                    No.
                  </th>
                  <th scope="col" className="px-3 py-2">
                    Nama
                  </th>
                  <th scope="col" className="px-3 py-2">
                    Tanggal
                  </th>
                  <th scope="col" className="px-3 py-2">
                    Jumlah
                  </th>
                </tr>
              </thead>
              <tbody>
                {historyPenarikan.map((v, i) => (
                  <tr key={i} className="bg-white border-b">
                    <th
                      scope="row"
                      className="px-2 py-2"
                    >
                      {i+1}
                    </th>
                    <th
                      scope="row"
                      className="px-3 py-2"
                    >
                      {v.nama}
                    </th>
                    <td className="px-3 py-2">
                      {format(
                        "dd:MM:yyyy",
                        new Date(v.setoran_keluar.tanggal_setoran_keluar)
                      )}
                    </td>
                    <td className="px-3 py-2">
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
