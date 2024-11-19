"use client";
import { useState, useEffect } from "react";
import AdminLayout from "@/app/components/adminLayout";
import SpinnerLoading from "@/app/components/spinner";
import formatRupiah from "@/helpers/formatRupiah";
import axios from "axios";
import { useState } from "react";
import { UserRoundPlus, X } from "lucide-react";

const DaftarNasabah = () => {
  const [nasabah, setNasabah] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);
  const [popUp, setPopUp] = useState(false);
  const [confirm, setConfirm] = useState(false);

  useState(function () {
    axios.get("/api/admin/nasabah").then((res) => {
      if (res.data.data.length === 0) {
        setIsEmpty(true);
      }
      setNasabah(res.data.data);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
 <AdminLayout>
        <div className="borderw-80 ml-[78px]">
          <h1 className="text-center text-xl font-bold p-2">Data Nasabah</h1>
          <div className="relative overflow-x-auto">
            <div className="flex justify-end py-2">
              <button
                onClick={() => setPopUp(true)}
                className="flex justify-around items-center py-2 px-3 bg-accent rounded-md"
              >
                <UserRoundPlus />
                Tambah Nasabah
              </button>
            </div>
            <table className="text-sm rtl:text-right text-gray-500 table-fixed text-center rounded-md">
              <thead className="text-xs text-gray-700 bg-accent">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Nama
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Total Saldo
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Total Sampah
                  </th>
                </tr>
              </thead>
              <tbody>
                {nasabah.map((v, i) => (
                  <tr key={i} className="bg-white border-b">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {v.nama}
                    </th>
                    <td className="px-6 py-4">
                      {formatRupiah(v.total_tabungan)}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {v.total_setoran} <span>Kg.</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <section className="flex justify-center items-center mt-2">
              {isLoading ? <SpinnerLoading /> : ""}
            </section>

            {isEmpty ? (
              <section className="flex justify-center">
                <p>Data kosong</p>
              </section>
            ) : (
              ""
            )}
          </div>
        </div>

        <div>
          {popUp ? (
            <div className="w-full h-screen layar-hitam fixed top-0 flex flex-col">
              <div className="bg-accent mx-2 p-2 xl:p-4 xl:w-[1000px] w-72 rounded-xl ml-[78px] mt-32">
                <div className="flex justify-between">
                  <h1 className="text-center text-xl font-bold p-2">
                    Tambah Nasabah
                  </h1>
                  <button
                    className="flex justify-around items-center py-2 px-3"
                    onClick={() => setPopUp(false)}
                  >
                    <X />
                  </button>
                </div>
                <div
                  // onSubmit={() => setConfirm(true)}
                  className="flex flex-col"
                >
                  <label className="block lg:text-lg text-black font-medium">
                    nama
                  </label>
                  <input
                    type="text"
                    name=""
                    id=""
                    className="h-10 rounded-lg mb-2 px-2 w-full xl:w-full text-black"
                    required
                  />
                  <button
                    onClick={() => setConfirm(true)}
                    type="submit"
                    className="text-white bg-primary font-bold rounded-lg text-base px-5 py-2.5 me-2 mt-2"
                  >
                    Simpan
                  </button>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>

        <div>
          {confirm ? (
            <div className="bg-background w-80 flex justify-center ml-16 p-5 rounded-lg relative bottom-20">
              <div className="flex flex-col justify-between h-40 my-2">
                <h1 className="text-xl font-bold">Konfirmasi Penambahan</h1>
                <div className="flex justify-around">
                  <button className="text-center font-medium bg-accent py-1 w-20 rounded-md">
                    Simpan
                  </button>
                  <button
                    onClick={() => setConfirm(false)}
                    className="text-center text-white font-medium bg-red-600 py-1 w-20 rounded-md"
                  >
                    Batal
                  </button>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </AdminLayout>
    </>
  );
};

export default DaftarNasabah;
