"use client";
import AdminLayout from "@/app/components/adminLayout";
import { useEffect, useState } from "react";
import axios from "axios";
import format from "date-format";
import SpinnerLoading from "@/app/components/spinner";

const DraftSetoranPage = ({ dataSetoranMasukInit = [], isLogin = false }) => {
  const [popUp, setPopUp] = useState(false);
  const [dataSetoranMasuk, setDataSetoranMasuk] =
    useState(dataSetoranMasukInit);
  const [detilSetoran, setDetilSetoran] = useState({});
  const [btnLoadingTolak, setBtnLoadingTolak] = useState(false);
  const [btnDisable, setBtnDisable] = useState(false);
  const [isLoading, setIsloading] = useState(true);
  const [btnLoadingSetuju, setBtnLoadingSetuju] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [btnXDisable, setBtnXDisable] = useState(false);

  const [msgError, setMsgError] = useState("");

  useEffect(function () {
    if (dataSetoranMasuk.length) {
      setIsloading(false);
    } else {
      setIsloading(false);
      setIsEmpty(true);
    }
  }, []);

  const setoranDiTolak = async (id) => {
    try {
      setBtnDisable(true);
      setBtnLoadingTolak(true);
      setBtnXDisable(true);

      await axios.delete(`/api/admin/setoran-masuk/${id}/tolak`);

      const filterData = [...dataSetoranMasuk].filter((v) => v._id !== id);
      setDataSetoranMasuk(filterData);

      setBtnDisable(false);
      setBtnLoadingTolak(false);
      setBtnXDisable(false);
      setPopUp(false);

      if (dataSetoranMasuk.length === 1) {
        setIsEmpty(true);
      }
    } catch (error) {
      setMsgError(error.message);
    }
  };

  const setoranDiSetujui = async (id) => {
    try {
      setBtnDisable(true);
      setBtnLoadingSetuju(true);
      setBtnXDisable(true);

      await axios.post(`/api/admin/setoran-masuk/${id}/setuju`);

      const filterData = [...dataSetoranMasuk].filter((v) => v._id !== id);
      setDataSetoranMasuk(filterData);

      setBtnDisable(false);
      setBtnLoadingSetuju(false);
      setPopUp(false);
      setBtnXDisable(false);

      if (dataSetoranMasuk.length === 1) {
        setIsEmpty(true);
      }
    } catch (error) {
      setMsgError(error.message);
    }
  };

  return (
    <>
      {msgError ? (
        <section className="fixed top-0 left-0 bottom-0 right-0 bg-white z-10 flex justify-center  items-center">
          <section>
            <p className="text-center text-red-500  font-medium text-lg">
              {msgError}
            </p>
            <p className="text-centerfont-semibold text-lg">
              Cobalah untuk merefresh halaman
            </p>
          </section>
        </section>
      ) : (
        ""
      )}
      <AdminLayout isLogin={isLogin}>
        <div className="w-[280px] ml-[73px] xl:w-[900px] xl:ml-20">
          <h1 className="text-center text-lg font-bold p-2">
            Draft Setoran Menunggu Acc
          </h1>
          <div className="relative w-fit xl:w-full">
            <table className="w-full text-sm rtl:text-right text-gray-500">
              <thead className="text-xs text-gray-700 bg-accent ">
                <tr>
                <th scope="col" className="px-3 py-3">
                    No.
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Nama
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Tanggal
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {dataSetoranMasuk.map((value, i) => (
                  <tr key={i} className="bg-white border-b">
                    <th
                      scope="row"
                      className="px-3 py-4"
                    >
                      {i+1}
                    </th>
                    <th
                      scope="row"
                      className="px-3 py-4"
                    >
                      {value.nama_nasabah}
                    </th>
                    <td className="px-3 py-4 text-center">
                      {format("dd:MM:yyyy", new Date(value.tanggal_setoran))}
                    </td>
                    <td className="px-3 py-4 text-center">
                      <button
                        onClick={() => {
                          setDetilSetoran(value);
                          setPopUp(true);
                          setBtnLoadingSetuju(false);
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
            <section className="fixed top-0 left-0 right-0 bottom-0 layar-hitam z-10 flex justify-center items-center">
              <div className="bg-background rounded-md relative bottom-20 py-5 mx-2 w-80 xl:w-96 mt-20">
                <div className="flex justify-between p-2 mx-5">
                  <h1 className="w-96 text-center text-lg font-bold">
                    Detil Setoran Nasabah
                  </h1>
                  <button
                    disabled={btnXDisable}
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
                    {format(
                      "dd:MM:yyyy",
                      new Date(detilSetoran.tanggal_setoran)
                    )}
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
                  <label>Harga Satuan</label>
                  <p className="bg-slate-300 rounded-md p-1 px-2">
                    {detilSetoran.harga_satuan}
                  </p>
                  <label>Total Harga</label>
                  <p className="bg-slate-300 rounded-md p-1 px-2">
                    {detilSetoran.harga_satuan * detilSetoran.jumlah_setoran}
                  </p>
                </div>
                <div className="flex justify-around w-72 xl:w-full mt-2">
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
            </section>
          ) : (
            ""
          )}
        </div>
      </AdminLayout>
    </>
  );
};

export default DraftSetoranPage;
