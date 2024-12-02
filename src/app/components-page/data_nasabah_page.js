"use client";
import { useState, useEffect } from "react";
import AdminLayout from "@/app/components/adminLayout";
import SpinnerLoading from "@/app/components/spinner";
import formatRupiah from "@/helpers/formatRupiah";
import { UserRoundPlus, X } from "lucide-react";

const DataNasabahPage = ({ nasabahInit = [], isLogin = false }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);
  const [popUp, setPopUp] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [nasabah, setNasabah] = useState(nasabahInit);

  const [namaNasabah, setNamaNasabah] = useState("");
  const [msg, setMsg] = useState("");
  const [addLoading, setAddLoading] = useState(false);
  const [addBtnDisable, setAddBtnDisable] = useState(false);
  const [addBtnDisableTolak, setAddBtnDisableTolak] = useState(false);

  useEffect(function () {
    if (nasabah.length) {
      setIsLoading(false);
    } else {
      setIsLoading(false);
      setIsEmpty(true);
    }
  }, []);

  const AddNasabah = async () => {
    try {
      setAddLoading(true);
      setAddBtnDisable(true);
      setAddBtnDisableTolak(true);

      const res = await fetch("/api/admin/nasabah/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          nama: namaNasabah,
        }),
      });

      const data = await res.json();

      setMsg(data?.message);
      setAddLoading(false);
      setAddBtnDisableTolak(false);
      setConfirm(false);
      setPopUp(false);
      setIsEmpty(false);
      setNasabah([data.data, ...nasabah]);
      setAddBtnDisable(false);
    } catch (error) {
      setAddBtnDisableTolak(false);
      setAddLoading(false);
    }
  };

  return (
    <>
      <AdminLayout isLogin={isLogin}>
        <h1 className="text-center text-xl font-bold p-2">Data Nasabah</h1>
        <div className="borderw-80 w-[280px] ml-[73px] xl:w-full xl:ml-24">
          <div className="relative overflow-x-auto">
            <div className="w-10/12">
              <div className="py-2">
                <button
                  onClick={() => setPopUp(true)}
                  className="flex justify-around items-center py-2 px-3 bg-accent rounded-md"
                >
                  <UserRoundPlus />
                  Tambah Nasabah
                </button>
              </div>
              <table className="text-sm rtl:text-right text-gray-500 table-fixed text-center rounded-md xl:w-full">
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
            </div>

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
                    onClick={() => {
                      setPopUp(false);
                      setConfirm(false);
                      setNamaNasabah("");
                    }}
                    disabled={addBtnDisable}
                  >
                    <X />
                  </button>
                </div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (namaNasabah) {
                      setConfirm(true);
                      setAddBtnDisable(false);
                    }
                  }}
                  className="flex flex-col"
                >
                  <label className="block lg:text-lg text-black font-medium">
                    nama
                  </label>
                  <input
                    type="text"
                    className="h-10 rounded-lg mb-2 px-2 w-full xl:w-full text-black"
                    required
                    onChange={(e) => setNamaNasabah(e.target.value)}
                    minLength={3}
                  />
                  <button
                    type="submit"
                    className="text-white bg-primary font-bold rounded-lg text-base px-5 py-2.5 me-2 mt-2"
                  >
                    Simpan
                  </button>
                </form>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>

        <div>
          {confirm ? (
            <div className="bg-background w-80 flex justify-center items-center ml-[73px] p-5 rounded-lg fixed top-24">
              <div className="flex flex-col justify-between h-40 my-2">
                <h1 className="text-xl font-bold">Konfirmasi Penambahan</h1>
                <div className="flex justify-around">
                  <button
                    className="text-center font-medium bg-accent py-1 w-20 rounded-md flex justify-center items-center"
                    onClick={AddNasabah}
                    disabled={addBtnDisable}
                  >
                    {addLoading ? <SpinnerLoading w="w-5" h="h-5" /> : "Simpan"}
                  </button>
                  <button
                    onClick={() => {
                      setConfirm(false);
                      setNamaNasabah("");
                      setPopUp(false);
                    }}
                    className="text-center text-white font-medium bg-red-600 py-1 w-20 rounded-md"
                    disabled={addBtnDisableTolak}
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

export default DataNasabahPage;
