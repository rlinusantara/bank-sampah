"use client";
import { useEffect, useState } from "react";
import Layout from "../components/layout";
import { Search } from "lucide-react";
import axios from "axios";
import formatRupiah from "@/helpers/formatRupiah";
import SpinnerLoading from "../components/spinner";
const DaftarNasabah = () => {
  const [allNasabah, setAllNasabah] = useState([]);
  const [nasabah, setNasabah] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(function () {
    axios.get("/api/nasabah").then((res) => {
      setNasabah(res.data.data);
      setAllNasabah(res.data.data);
      setIsLoading(false);
    });
  }, []);

  const btnCari = (value) => {
    const filter = allNasabah.filter((v) => {
      const regex = new RegExp(value, "gi");
      const str = v.nama;

      if (regex.test(str)) {
        return v;
      }
    });

    setNasabah(filter);
  };

  return (
    <>
      <Layout>
        <div className="p-4">
          <div className="flex mb-4">
            <input
              type="text"
              placeholder="Cari Nasabah"
              className="border p-2 flex-grow mr-2 rounded"
              onChange={(e) => btnCari(e.target.value)}
            />
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
              {nasabah.map((v, i) => (
                <tr key={i}>
                  <td className="border p-1">{i + 1}</td>
                  <td className="border p-1">{v.nama}</td>
                  <td className="border p-1">
                    {formatRupiah(v.total_tabungan)}
                  </td>
                  <td className="border p-1">
                    {v.total_setoran}
                    <span> Kg.</span>
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
      </Layout>
    </>
  );
};

export default DaftarNasabah;
