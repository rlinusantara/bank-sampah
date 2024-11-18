"use client";
import AdminLayout from "@/app/components/adminLayout";
import { useState, useEffect } from "react";
const TambahNasabah = () => {
  const [popUp, setPopUp] = useState(false);
  return (
    <>
      <AdminLayout>
        <div className="ml-16 w-80 xl:w-[100%] xl:relative xl:left-32">
          <h1 className="text-center text-xl font-bold p-2">Tambah Nasabah</h1>
          <form
            onSubmit={() => setPopUp(true)}
            className="bg-accent flex flex-col mx-2 p-2 xl:p-4 xl:w-[1000px] w-full rounded-xl"
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
              type="submit"
              className="text-white bg-primary font-bold rounded-lg text-base px-5 py-2.5 me-2 mt-2"
            >
              Simpan
            </button>
          </form>
        </div>
        <div>
          {popUp ? (
            <div className="bg-background w-80 flex justify-center ml-16 p-5 rounded-lg relative bottom-20">
              <div className="flex flex-col justify-between h-40 my-2">
                <h1 className="text-xl font-bold">Konfirmasi Penambahan</h1>
                <div className="flex justify-around">
                  <button className="text-center font-medium bg-accent py-1 w-20 rounded-md">
                    Simpan
                  </button>
                  <button
                    onClick={() => setPopUp(false)}
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

export default TambahNasabah;
