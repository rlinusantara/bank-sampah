"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import FormSampah2 from "./formSampah2";
import FormSampah1 from "./formSampah1";

const FormInputSampah = () => {
  const [loading, setLoading] = useState(true);
  const [nasabah, setNasabah] = useState([]);
  const [tipeInput, setTipeInput] = useState("satu");
  const [harga, setHarga] = useState(0);

  useEffect(function () {
    const getNasabah = async () => {
      try {
        const response = await axios.get("/api/nasabah");
        const p = response.data.data.map((item) => ({
          label: item.nama,
          value: item._id,
        }));

        setNasabah(p);
        setLoading(false);
        setHarga(response.data.harga_satuan);
      } catch (error) {
        console.log(error);
      }
    };
    getNasabah();
  }, []);

  if (loading) {
    return (
      <div className="text-center">
        <div role="status">
          <svg
            aria-hidden="true"
            className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
          <p className="test-center">Sedang Memuat Data....</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-center">
        <div className="flex flex-col  bg-accent mx-2 p-2 xl:p-4 xl:w-[1000px] w-full rounded-xl">
          <div className="">
            <label className="block mb-2 text-lg font-medium text-gray-900 ">
              Pilih Jenis Input
            </label>
            <select
              onChange={(e) => setTipeInput(e.target.value)}
              className="h-10 w-full rounded-lg px-2 mb-2 text-black"
            >
              <option value="satu">1 Jenis</option>
              <option value="dua">2 Jenis</option>
            </select>
          </div>
          {tipeInput === "dua" && (
            <FormSampah2 nasabah={nasabah} hargaSatuan={harga} />
          )}
          {tipeInput === "satu" && (
            <FormSampah1 nasabah={nasabah} hargaSatuan={harga} />
          )}
          {/* akhir */}
        </div>
      </div>
    </>
  );
};

export default FormInputSampah;
