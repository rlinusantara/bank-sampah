"use client";
import { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";
import { useRef } from "react";
import { CircleCheckBig } from "lucide-react";

const FormInputSampah = () => {
  const [loading, setLoading] = useState(true);
  const [tanggal, setTanggal] = useState("");
  const [nasabah, setNasabah] = useState([]);
  const [jumlahSampahHalus, setJumlahSampahHalus] = useState(0);
  const [jumlahSampahKasar, setJumlahSampahKasar] = useState(0);
  const [jenisSampah, setJenisSampah] = useState("");
  const [_id, setId] = useState("");
  const form = useRef();
  const [popUp, setPopUp] = useState(false);
  const selectRef = useRef(null);
  const [msg, setMsg] = useState("");
  const [btnDisable, setBtnDisable] = useState(false);
  const [popUpIsLoading, setPopUpisLoading] = useState(false);

  const sendData = async (e) => {
    e.preventDefault();
    try {
      setBtnDisable(true);
      setPopUp(true);
      setPopUpisLoading(true);
      const res = await axios.post("/api/setoran-masuk", {
        id_nasabah: _id.value,
        tanggal_setoran: tanggal,
        sampah_halus: jumlahSampahHalus,
        sampah_kasar: jumlahSampahKasar,
        jenis_sampah: jenisSampah,
      });
      setTimeout(() => {
        setPopUpisLoading(false);
        setMsg(res.data?.message);
        form.current.reset();
        selectRef.current.clearValue();
      }, 1000);
    } catch (error) {
      setPopUpisLoading(false);
      if (error.response.data.errors) {
        setMsg(error.response.data.errors.join("\n\n"));
      } else {
        setMsg(error.message);
      }
    }
  };
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
      <div className=" xl:w-full flex justify-center font-nunito">
        <form
          ref={form}
          onSubmit={sendData}
          className="bg-accent flex flex-col mx-2 p-2 xl:p-4 xl:w-[90%] w-full rounded-xl"
        >
          <label className="block lg:text-lg text-black font-medium ">
            Tanggal
          </label>
          <input
            onChange={(e) => setTanggal(e.target.value)}
            type="date"
            name=""
            id=""
            className="h-10 rounded-lg px-2 mb-2 text-black"
            required
          />
          <label className="block lg:text-lg text-black font-medium">
            Nasabah
          </label>
          {nasabah.length > 0 && (
            <Select
              ref={selectRef}
              options={nasabah}
              placeholder="Pilih Nasabah"
              className="w-full rounded-lg"
              onChange={setId}
              required
            />
          )}
          <div className="">
            <label className="block lg:text-lg  text-black font-medium">
              Jumlah Sampah Halus
            </label>
            <input
              onChange={(e) => setJumlahSampahHalus(+e.target.value)}
              type="number"
              name=""
              id=""
              className="h-10 rounded-lg px-2 mb-2 w-full lg:w-72 text-black"
              required
              step="any"
            />
            <label className="block lg:text-lg text-black font-medium">
              Jumlah Sampah Kasar
            </label>
            <input
              onChange={(e) => setJumlahSampahKasar(+e.target.value)}
              type="number"
              name=""
              id=""
              className="h-10 rounded-lg px-2 mb-2 w-full lg:w-72 text-black"
              required
              step="any"
            />
            <label className="block lg:text-lg text-black font-medium">
              Jenis Sampah
            </label>
            <input
              onChange={(e) => setJenisSampah(e.target.value)}
              type="text"
              name=""
              id=""
              className="h-10 rounded-lg mb-2 px-2 w-full lg:w-72 text-black"
              required
            />
          </div>
          <p className="block text-md text-black font-medium py-3">
            Harga Saat Ini : <span>250</span>
          </p>
          <button
            disabled={btnDisable}
            type="submit"
            className="text-white bg-primary font-bold rounded-lg text-base px-5 py-2.5 me-2 mb-2"
          >
            Simpan
          </button>
        </form>
      </div>

      {popUp ? (
        <section className="fixed left-0 right-0 top-0 bottom-0 layar-hitam">
          <section className="fixed w-full flex justify-center top-60 p-5">
            <div className="flex flex-col items-center justify-center bg-background w-96 p-10 rounded-lg border border-gray-300">
              {popUpIsLoading ? (
                <div role="status" className="flex flex-col items-center gap-5">
                  <svg
                    aria-hidden="true"
                    className="w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-[#15803d]"
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
                  <p className=" text-green-700 font-bold text-xl ">
                    Tunggu sebentar
                  </p>
                </div>
              ) : (
                <section className="flex flex-col items-center">
                  <div>
                    <CircleCheckBig size={80} />
                  </div>
                  <div className="p-4">
                    <h2 className="text-xl whitespace-pre-line">{msg}</h2>
                  </div>

                  <button
                    onClick={() => {
                      setPopUp(false);
                      setBtnDisable(false);
                    }}
                    type="button"
                    className="p-2  text-white bg-green-700 hover:bg-green-800 font-bold rounded-lg text-lg px-5 py-2.5 me-2 mb-2 "
                  >
                    Tutup
                  </button>
                </section>
              )}
            </div>
          </section>
        </section>
      ) : (
        ""
      )}
    </>
  );
};

export default FormInputSampah;
