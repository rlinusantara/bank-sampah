"use client";
import AdminLayout from "@/app/components/adminLayout";
import { useEffect, useRef, useState } from "react";
import Select from "react-select";
import axios from "axios";
import formatRupiah from "@/helpers/formatRupiah";
import SpinnerLoading from "@/app/components/spinner";
const SetoranKeluar = () => {
  const [popUp, setPopUp] = useState(false);
  const [nasabah, setNasabah] = useState([]);
  const [detilNasabah, setDetilNasabah] = useState({});
  const [saldoTarik, setSaldoTarik] = useState(0);
  const [btnDisable, setBtnDisable] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const form = useRef();
  const selectRef = useRef();

  useEffect(function () {
    const getNasabah = async () => {
      try {
        const response = await axios.get("/api/nasabah");
        const p = response.data.data.map((item) => {
          return {
            label: item.nama,
            value: item._id,
            saldo: item.total_tabungan,
          };
        });
        // console.log(p)
        setNasabah(p);
      } catch (error) {
        console.log(error);
      }
    };
    getNasabah();
  }, []);

  const btnTarikTabungan = async () => {
    try {
      setBtnDisable(true);
      setBtnLoading(true);

      await axios.post("/api/admin/tarik-tabungan", {
        id_nasabah: detilNasabah.value,
        saldo: saldoTarik,
      });

      const filter = nasabah.map((v) => {
        if (v.value === detilNasabah.value) {
          v.saldo = v.saldo - saldoTarik;
        }

        return v;
      });

      setTimeout(() => {
        setBtnDisable(false);
        setBtnLoading(false);
        setPopUp(false);
        form.current.reset();
        selectRef.current.clearValue();
        setDetilNasabah({});
        setNasabah([...filter]);
      }, 500);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <AdminLayout>
        <div className="w-[280px] ml-[73px] xl:w-[100%] xl:relative xl:left-32">
          <h1 className="text-center font-bold text-xl p-2">
            Form Penarikan Uang
          </h1>
          <form
            ref={form}
            onSubmit={(e) => {
              e.preventDefault();

              if (detilNasabah.saldo - saldoTarik < 0) {
                setMsg("Tabungan tidak cukup");
                return;
              }
              setMsg("");
              setPopUp(true);
            }}
            className="bg-background p-4 mx-2 rounded-md"
          >
            <label className="p-1">Nama Nasabah</label>
            {nasabah.length > 0 && (
              <Select
                ref={selectRef}
                options={nasabah}
                placeholder="Pilih Nasabah"
                className="w-full rounded-lg p-1 mb-2"
                required
                onChange={setDetilNasabah}
              />
            )}
            <label className="p-1">Saldo Nasabah</label>
            <p className="p-1 mb-2 bg-slate-200 rounded-sm">
              {formatRupiah(detilNasabah.saldo || 0)}
            </p>
            <label className="p-1">Jumlah Penarikan</label>
            <input
              required
              type="number"
              placeholder="Jumlah Uang"
              className="p-2 rounded-lg w-full mb-2"
              onChange={(e) => setSaldoTarik(+e.target.value)}
            />
            <section className="flex justify-between items-center">
              <button className="bg-accent py-1 px-2 text-center rounded-md my-2">
                Tarik
              </button>
              <p className="text-red-500">{msg}</p>
            </section>
          </form>
        </div>
        /
        <div>
          {popUp ? (
            <div className="w-full layar-hitam h-screen fixed top-0 z-1 flex justify-center pr-5 items-center">
              <div className="bg-background w-72 h-fit p-5 rounded-lg flex justify-center -mt-40">
                <div className="flex flex-col justify-between h-40 my-2">
                  <h1 className="text-lg font-bold">Konfirmasi Penarikan</h1>
                  <div className="flex justify-between">
                    <button
                      disabled={btnDisable}
                      className="text-center font-medium bg-accent py-1 w-20 rounded-md flex justify-center items-center"
                      onClick={btnTarikTabungan}
                    >
                      {btnLoading ? <SpinnerLoading w="w-5" h="h-5" /> : "Ya"}
                    </button>
                    <button
                      disabled={btnDisable}
                      onClick={() => setPopUp(false)}
                      className="text-center text-white font-medium bg-red-600 py-1 w-20 rounded-md"
                    >
                      Batal
                    </button>
                  </div>
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

export default SetoranKeluar;
