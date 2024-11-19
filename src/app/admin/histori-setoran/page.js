"use client";

import AdminLayout from "@/app/components/adminLayout";
import { useState } from "react";

const historiNasabah = () => {
  const [popUp, setPopUp] = useState(false);
  return (
    <>
      <AdminLayout>
        <div className="w-80 ml-[78px]">
          <h1 className="text-center text-xl font-bold p-2">Riwayat Setoran</h1>
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
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    Nasmaaa
                  </th>
                  <td className="px-6 py-4">tgl</td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => setPopUp(true)}
                      className="bg-primary py-1 px-3 rounded-md text-white text-center"
                    >
                      Detil
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {popUp ? (
            <section className="fixed top-0 left-0 right-0 bottom-0 layar-hitam z-10 flex justify-center items-center">
              <div className="bg-background rounded-md relative bottom-20 py-5 mx-2 w-80 mt-20">
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
                  <label>Tanggal</label>
                  <p className="bg-slate-300 rounded-md p-1 px-2">12-22-22</p>
                  <label>Nama</label>
                  <p className="bg-slate-300 rounded-md p-1 px-2">s</p>
                  <label>Jumlah Sampah Halus</label>
                  <p className="bg-slate-300 rounded-md p-1 px-2">
                    a <span>Kg.</span>
                  </p>
                  <label>Jumlah Sampah Kasar</label>
                  <p className="bg-slate-300 rounded-md p-1 px-2">
                    a <span>Kg.</span>
                  </p>
                  <label>Jumlah Setoran</label>
                  <p className="bg-slate-300 rounded-md p-1 px-2">
                    a <span>Kg.</span>
                  </p>
                  <label>Jenis Sampah</label>
                  <p className="bg-slate-300 rounded-md p-1 px-2">a</p>
                </div>
                <div className="flex justify-around w-72 mt-2">
                  <button className="text-center font-medium bg-accent py-1 w-20 rounded-md flex justify-center items-center">
                    Setuju
                  </button>
                  <button>Tolak</button>
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

export default historiNasabah;
