"use client";
import AdminLayout from "@/app/components/adminLayout";
import { useEffect, useState } from "react";
import axios from "axios";
import format from "date-format";
import SpinnerLoading from "@/app/components/spinner";

const DraftSetoran = () => {
  const [popUp, setPopUp] = useState(false);
  const [dataSetoranMasuk, setDataSetoranMasuk] = useState([]);
  const [detilSetoran, setDetilSetoran] = useState({});
  const [btnLoadingTolak, setBtnLoadingTolak] = useState(false);
  const [btnDisable, setBtnDisable] = useState(false);
  const [isLoading, setIsloading] = useState(true);
  const [btnLoadingSetuju, setBtnLoadingSetuju] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(function () {
    axios.get("/api/admin/setoran-masuk").then((res) => {
      if (res.data.data.length === 0) {
        setIsEmpty(true);
      }
      setIsloading(false);
      setDataSetoranMasuk(res.data.data);
    });
  }, []);

  const setoranDiTolak = async (id) => {
    try {
      setBtnDisable(true);
      setBtnLoadingTolak(true);

      await axios.delete(`/api/admin/setoran-masuk/${id}/tolak`);

      const filterData = [...dataSetoranMasuk].filter((v) => v._id !== id);
      setDataSetoranMasuk(filterData);

      setBtnDisable(false);
      setBtnLoadingTolak(false);
      setPopUp(false);
    } catch (error) {
      console.log(error);
    }
  };

  const setoranDiSetujui = async (id) => {
    try {
      setBtnDisable(true);
      setBtnLoadingSetuju(true);

      await axios.post(`/api/admin/setoran-masuk/${id}/setuju`);

      const filterData = [...dataSetoranMasuk].filter((v) => v._id !== id);
      setDataSetoranMasuk(filterData);

      setBtnDisable(false);
      setBtnLoadingSetuju(false);
      setPopUp(false);
    } catch (error) {
      console.log();
    }
  };

  return (
    <>
      <AdminLayout>
        <div className="ml-16 w-80">
          <h1 className="text-center text-xl font-bold p-2">
            Draft Setoran Menunggu Acc
          </h1>
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
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {dataSetoranMasuk.map((value, i) => (
                  <tr key={i} className="bg-white border-b">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {value.nama_nasabah}
                    </th>
                    <td className="px-6 py-4">
                      {format("dd:MM:yyyy", new Date(value.tanggal_setoran))}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => {
                          setDetilSetoran(value);
                          setPopUp(true);
                        }}
                        className="bg-primary py-1 px-3 rounded-md text-white text-center"
                      >
                        Detil
                      </button>
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

            {isEmpty ? (
              <section className="flex justify-center">
                <p>Data kosong</p>
              </section>
            ) : (
              ""
            )}
          </div>

          {popUp ? (
            <div className="bg-background rounded-md relative bottom-20 py-5 mx-2">
              <div className="flex justify-between p-2 mx-5">
                <h1 className="w-96 text-center text-lg font-bold">
                  Detil Setoran Nasabah
                </h1>
                <button
                  onClick={() => setPopUp(false)}
                  className="font-extrabold text-xl"
                >
                  X
                </button>
              </div>
              <div className="p-2 mx-2">
                <label>Tanggal</label>
                <p className="bg-slate-300 rounded-md p-1 px-2">
                  {" "}
                  {format("dd:MM:yyyy", new Date(detilSetoran.tanggal_setoran))}
                </p>
                <label>Nama</label>
                <p className="bg-slate-300 rounded-md p-1 px-2">
                  {detilSetoran.nama_nasabah}
                </p>
                <label>Jumlah Sampah Halus</label>
                <p className="bg-slate-300 rounded-md p-1 px-2">
                  {detilSetoran.sampah_halus} <span>Kg.</span>
                </p>
                <label>Jumlah Sampah Kasar</label>
                <p className="bg-slate-300 rounded-md p-1 px-2">
                  {detilSetoran.sampah_kasar} <span>Kg.</span>
                </p>
                <label>Jumlah Setoran</label>
                <p className="bg-slate-300 rounded-md p-1 px-2">
                  {detilSetoran.jumlah_setoran} <span>Kg.</span>
                </p>
                <label>Jenis Sampah</label>
                <p className="bg-slate-300 rounded-md p-1 px-2">
                  {detilSetoran.jenis_sampah}
                </p>
              </div>
              <div className="flex justify-around w-72 mt-2">
                <button
                  disabled={btnDisable}
                  className="text-center font-medium bg-accent py-1 w-20 rounded-md flex justify-center items-center"
                  onClick={() => setoranDiSetujui(detilSetoran._id)}
                >
                  {btnLoadingSetuju ? (
                    <SpinnerLoading w="w-5" h="h-5" />
                  ) : (
                    "Setuju"
                  )}
                </button>
                <button
                  disabled={btnDisable}
                  className="text-center text-white font-medium bg-red-600 py-1 w-20 rounded-md flex justify-center items-center"
                  onClick={() => setoranDiTolak(detilSetoran._id)}
                >
                  {btnLoadingTolak ? (
                    <SpinnerLoading w="w-5" h="h-5" />
                  ) : (
                    "Tolak"
                  )}
                </button>
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

export default DraftSetoran;
