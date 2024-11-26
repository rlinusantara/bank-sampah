"use client";

import AdminLayout from "@/app/components/adminLayout";

import { useEffect, useState } from "react";
import format from "date-format";
import SpinnerLoading from "@/app/components/spinner";

const HistorySetoranPage = ({ historySetoran = [], isLogin = false }) => {
  const [popUp, setPopUp] = useState(false);
  const [detilHistorySetoran, setDetilHistorySetoran] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(function () {
    if (historySetoran.length) {
      setIsLoading(false);
    } else {
      setIsLoading(false);
      setIsEmpty(true);
    }
  }, []);

  return (
    <>
      <AdminLayout isLogin={isLogin}>
        <h1 className="text-center text-xl font-bold p-2">Riwayat Setoran</h1>
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
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {historySetoran.map((v, i) => (
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
                        new Date(
                          v.history_setoran_masuk.tanggal_setoran_disetujui
                        )
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => {
                          setPopUp(true);
                          setDetilHistorySetoran(v);
                        }}
                        className="bg-primary py-1 px-3 rounded-md text-white text-center"
                      >
                        Detil
                      </button>
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
              <section className="flex justify-center items-center mt-2">
                <p>Data kosong</p>
              </section>
            ) : (
              ""
            )}
          </div>
          {popUp ? (
            <section className="fixed top-0 left-0 right-0 bottom-0 layar-hitam z-10 flex justify-center items-center">
              <div className="bg-background rounded-md relative bottom-20 py-5 mx-2 w-80 xl:w-96 mt-20">
                <div className="flex justify-between p-2 mx-5">
                  <h1 className="w-96 text-center text-lg font-bold">
                    Detil Setoran Nasabah
                  </h1>
                  <button
                    onClick={() => setPopUp(false)}
                    className="font-extrabold text-xl"
                  >
                    X
                  </button>
                </div>
                <div className="p-2 mx-2">
                  <label>Tanggal Disetujui</label>
                  <p className="bg-slate-300 rounded-md p-1 px-2">
                    {format(
                      "dd:MM:yyyy",
                      new Date(
                        detilHistorySetoran.history_setoran_masuk.tanggal_setoran_disetujui
                      )
                    )}
                  </p>
                  <label>Tanggal Setoran</label>
                  <p className="bg-slate-300 rounded-md p-1 px-2">
                    {format(
                      "dd:MM:yyyy",
                      new Date(
                        detilHistorySetoran.history_setoran_masuk.tanggal_setoran
                      )
                    )}
                  </p>
                  <label>Nama</label>
                  <p className="bg-slate-300 rounded-md p-1 px-2">
                    {detilHistorySetoran.nama}
                  </p>
                  <label>Jumlah Sampah Halus</label>
                  <p className="bg-slate-300 rounded-md p-1 px-2">
                    {detilHistorySetoran.history_setoran_masuk.sampah_halus}{" "}
                    <span>Kg.</span>
                  </p>
                  <label>Jumlah Sampah Kasar</label>
                  <p className="bg-slate-300 rounded-md p-1 px-2">
                    {detilHistorySetoran.history_setoran_masuk.sampah_kasar}{" "}
                    <span>Kg.</span>
                  </p>
                  <label>Jumlah Setoran</label>
                  <p className="bg-slate-300 rounded-md p-1 px-2">
                    {detilHistorySetoran.history_setoran_masuk.jumlah_setoran}{" "}
                    <span>Kg.</span>
                  </p>
                  <label>Jenis Sampah</label>
                  <p className="bg-slate-300 rounded-md p-1 px-2">
                    {detilHistorySetoran.history_setoran_masuk.jenis_sampah}
                  </p>
                  <label>Harga Sampah</label>
                  <p className="bg-slate-300 rounded-md p-1 px-2">
                    {detilHistorySetoran.history_setoran_masuk.harga_satuan}
                  </p>
                </div>
              </div>
            </section>
          ) : (
            ""
          )}
        </div>
      </AdminLayout>
    </>
  );
};

export default HistorySetoranPage;
