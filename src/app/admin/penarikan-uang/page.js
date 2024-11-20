"use client"
import AdminLayout from "@/app/components/adminLayout";
import { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";
const SetoranKeluar = () => {
    const [popUp, setPopUp] = useState(false);
    const [nasabah, setNasabah] = useState([]);
    const [saldo,setSaldo] = useState([])
    useEffect(function () {
        const getNasabah = async () => {
          try {
            const response = await axios.get("/api/nasabah");
            const p = response.data.data.map((item) => ({
              label: item.nama,
              value: item._id,
            //   saldo : item.total_tabungan,
            }));
            // console.log(p)
            setNasabah(p);
          } catch (error) {
            console.log(error);
          }
        };
        getNasabah();
      }, []);
    return (
        <>
        <AdminLayout>
            <div className="w-[280px] ml-[73px] xl:w-[100%] xl:relative xl:left-32">
                <h1 className="text-center font-bold text-xl p-2">Form Penarikan Uang</h1>
                <form onSubmit={() => setPopUp(true)}  className="bg-background p-4 mx-2 rounded-md">
                    <label className="p-1">Nama Nasabah</label>
                    {nasabah.length > 0 && (
                        <Select
                        options={nasabah}
                        placeholder="Pilih Nasabah"
                        className="w-full rounded-lg p-1 mb-2"
                        required
                        />
                    )}
                    <label className="p-1">Saldo Nasabah</label>
                    <p className="p-1 mb-2 bg-slate-200 rounded-sm"><span>Rp.</span>20.000</p>
                    <label className="p-1">Jumlah Penarikan</label>
                    <input required type="number" placeholder="Jumlah Uang"  className="p-2 rounded-lg w-full mb-2"/>
                    <button className="bg-accent py-1 px-2 text-center rounded-md my-2">Tarik</button>
                </form>
            </div>/
            <div>
          {popUp ? (
            <div className="w-full layar-hitam h-screen fixed z-20 top-0 flex justify-end pr-5 pt-10">
                <div className="bg-background w-72 h-fit p-5 rounded-lg flex justify-center">
                    <div className="flex flex-col justify-between h-40 my-2">
                        <h1 className="text-lg font-bold">Konfirmasi Penarikan</h1>
                        <div className="flex justify-between">
                        <button className="text-center font-medium bg-accent py-1 w-20 rounded-md">
                            Ya
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
            </div>
          ) : (
            ""
          )}
        </div>
        </AdminLayout>
        </>
    );
}
 
export default SetoranKeluar;