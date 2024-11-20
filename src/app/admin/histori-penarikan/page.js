"use client";
import AdminLayout from "@/app/components/adminLayout";
import formatRupiah from "@/helpers/formatRupiah";
import { useState,useEffect } from "react";

const historiPenarikan = () => {
  return (
    <>
      <AdminLayout>
        <div className="w-[280px] ml-[73px]">
          <h1 className="text-center text-xl font-bold p-2">Riwayat Penarikan</h1>
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
                <tr className="bg-white border-b">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    Budiono
                  </th>
                  <td className="px-6 py-4">19-07-2024</td>
                  <td className="px-6 py-4 text-center">
                    {formatRupiah(20000)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default historiPenarikan;
