"use client";
import AdminLayout from "@/app/components/adminLayout";
import formatRupiah from "@/helpers/formatRupiah";
import { X } from "lucide-react";
import { useState } from "react";

const hargaSampah = () => {
  const [popUp, setPopUp] = useState(false);
  return (
    <>
      <AdminLayout>
        <div className="w-80 ml-[78px]">
          <h1 className="text-center text-xl font-bold p-2">Harga Sampah</h1>
          <div className="w-64">
            <table className="w-full">
              <thead className=" bg-accent text-left">
                <tr>
                  <th className="p-2">Harga Sampah</th>
                  <th className="p-2">Aksi</th>
                </tr>
              </thead>
              <tbody className="bg-background">
                <tr className="text-left">
                  <td className="p-2">{formatRupiah(250)}</td>
                  <td className="p-2">
                    <button
                      className="bg-primary py-1 px-3 rounded-md text-white"
                      onClick={() => setPopUp(true)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
          {popUp ? (
            <div className="w-full h-screen layar-hitam fixed top-0 flex flex-col">
              <div className="bg-accent w-64 mx-2 p-2 xl:p-4 xl:w-[1000px] rounded-xl ml-[78px] mt-32">
                <div className="flex justify-between">
                  <h1 className="text-center text-xl font-bold p-2">
                    Ubah Harga
                  </h1>
                  <button
                    className="flex justify-around items-center py-2 px-3"
                    onClick={() => setPopUp(false)}
                  >
                    <X />
                  </button>
                </div>
                <form className="flex flex-col">
                  <label className="block lg:text-lg text-black font-medium">
                    Harga
                  </label>
                  <input
                    type="number"
                    className="h-10 rounded-lg mb-2 px-2 w-full xl:w-full text-black"
                    required
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
      </AdminLayout>
    </>
  );
};

export default hargaSampah;
