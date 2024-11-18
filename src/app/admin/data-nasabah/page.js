"use client";
import AdminLayout from "@/app/components/adminLayout";
import SpinnerLoading from "@/app/components/spinner";
import formatRupiah from "@/helpers/formatRupiah";
import axios from "axios";
import { useState } from "react";

const DaftarNasabah = () => {
  const [nasabah, setNasabah] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);

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
        <div className="ml-16 w-80">
          <h1 className="text-center text-xl font-bold p-2">Data Nasabah</h1>
          <div className="relative">
            <table className="w-full text-sm rtl:text-right text-gray-500 table-fixed text-center">
              <thead className="text-xs text-gray-700 bg-accent ">
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
      </AdminLayout>
    </>
  );
};

export default DaftarNasabah;
