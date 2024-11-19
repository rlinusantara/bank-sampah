"use client";
import Layout from "../components/layout";
import { Search } from "lucide-react";
const DaftarNasabah = () => {
  return (
    <>
      <Layout>
        <div className="p-4">
          <div className="flex mb-4">
            <input
              type="text"
              placeholder="Cari Nasabah"
              className="border p-2 flex-grow mr-2 rounded"
            />
            <button className="bg-primary text-white p-2 rounded">
              <Search />
            </button>
          </div>
          <table className="min-w-full border">
            <thead>
              <tr>
                <th className="border p-1">No.</th>
                <th className="border p-1">Nama</th>
                <th className="border p-1">Tabungan</th>
                <th className="border p-1">Total Setoran</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-1">1</td>
                <td className="border p-1">Budiono Siregar</td>
                <td className="border p-1">
                  <span>Rp.</span>100.000
                </td>
                <td className="border p-1">
                  10<span>Kg.</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Layout>
    </>
  );
};

export default DaftarNasabah;
