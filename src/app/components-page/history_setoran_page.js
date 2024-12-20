"use client";
import AdminLayout from "@/app/components/adminLayout";
import Select from "react-select";
import { useEffect, useState } from "react";
import format from "date-format";
import SpinnerLoading from "@/app/components/spinner";
import * as XLSX from "xlsx";

const HistorySetoranPage = ({ historySetoran = [], isLogin = false }) => {
  const [popUp, setPopUp] = useState(false);
  const [detilHistorySetoran, setDetilHistorySetoran] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);
  const [selectNasabah, setSelectNasabah] = useState([]);
  const [historySetoranFilter, setHistorySetoranFilter] =
    useState(historySetoran);
  const [excelShow, setExcelShow] = useState(false);

  const [nasabahSelectValue, setNasabahSelectValue] = useState({});

  useEffect(function () {
    if (historySetoran.length) {
      const nasabah = [{ value: "", label: "All" }];
      historySetoran.forEach((item) => {
        const alreadyExists = nasabah.some(
          (nasabahItem) => nasabahItem.value === item._id
        );

        if (!alreadyExists) {
          nasabah.push({
            label: item.nama,
            value: item._id,
          });
        }
      });

      setSelectNasabah(nasabah);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      setIsEmpty(true);
    }
  }, []);

  useEffect(
    function () {
      if (Object.keys(nasabahSelectValue).length) {
        if (nasabahSelectValue.label === "All") {
          setHistorySetoranFilter(historySetoran);
          setNasabahSelectValue({});
        } else {
          const filter = historySetoran.filter(
            (item) => item._id === nasabahSelectValue.value
          );
          setHistorySetoranFilter(filter);
        }
      }
    },
    [nasabahSelectValue]
  );

  useEffect(function () {
    setExcelShow(true);
    if (historySetoran.length === 0) {
      setExcelShow(false);
      setIsEmpty(true);
    }
    setIsLoading(false);
  }, []);
  const exportToExcel = () => {
    const wb = XLSX.utils.book_new();
    const data = [...historySetoranFilter].map((item) => ({
      nama: item.nama,
      jenis_sampah: item.history_setoran_masuk.jenis_sampah,
      jumlah_setoran: item.history_setoran_masuk.jumlah_setoran,
      tanggal_setoran: item.history_setoran_masuk.tanggal_setoran,
      tanggal_setoran_disetujui:
        item.history_setoran_masuk.tanggal_setoran_disetujui,
    }));
    const dataExcel = [];
    for (let i = 0; i < data.length; i++) {
      dataExcel.push({
        No: i + 1,
        nama: data[i].nama,
        "jenis sampah": data[i].jenis_sampah,
        "jumlah setoran": data[i].jumlah_setoran,
        "tanggal setoran": data[i].tanggal_setoran,
        "tanggal setoran disetujui": data[i].tanggal_setoran_disetujui,
      });
    }

    const ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "riwayat-setroran.xlsx");
  };

  return (
    <>
      <AdminLayout isLogin={isLogin}>
        <div className="w-fit ml-[73px] xl:w-[900px] lg:w-fit xl:ml-24">
          <h1 className="text-center text-xl font-bold p-2">Riwayat Setoran</h1>
          <div className="relative">
            <section className="flex items-center justify-between">
            <div className="flex">
              {selectNasabah.length > 0 ? (
                <Select
                  className="border-2 border-accent w-32 rounded-md my-1"
                  options={selectNasabah}
                  defaultValue={selectNasabah[0]}
                  onChange={setNasabahSelectValue}
                />
              ) : (
                ""
              )}
            </div>
           <div>
           {excelShow ? (
                <section onClick={exportToExcel} className="bg-accent px-3 py-2 rounded-md cursor-pointer">
                  <p className="font-medium text-md">Export Excel</p>
                </section>
            ) : (
              ""
            )}
           </div>
            </section>
            <table className="w-full text-sm rtl:text-right text-gray-500 table-fixed text-center">
              <thead className="text-xs text-gray-700 bg-accent ">
                <tr>
                  <th scope="col" className="px-0.5 w-7">
                    No.
                  </th>
                  <th scope="col" className="px-1 py-1">
                    Nama
                  </th>
                  <th scope="col" className="px-1 py-1">
                    Jumlah Setoran (Kg.)
                  </th>
                  <th scope="col" className="px-1 py-1">
                    Tanggal
                  </th>
                  <th scope="col" className="px-1 py-1">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {historySetoranFilter.map((v, i) => (
                  <tr key={i} className="bg-white border-b">
                    <th scope="row" className="">
                      {i + 1}
                    </th>
                    <th scope="row" className="px-1 py-2">
                      {v.nama}
                    </th>
                    <th scope="row" className="px-1 py-2">
                      {v.history_setoran_masuk.jumlah_setoran}
                    </th>
                    <td className="px-1 py-2">
                      {format(
                        "dd:MM:yyyy",
                        new Date(v.history_setoran_masuk.tanggal_setoran)
                      )}
                    </td>
                    <td className="py-1 text-center">
                      <button
                        onClick={() => {
                          setPopUp(true);
                          setDetilHistorySetoran(v);
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
              <section className="flex justify-center items-center mt-2">
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
                    onClick={() => setPopUp(false)}
                    className="font-extrabold text-xl"
                  >
                    X
                  </button>
                </div>
                <div className="p-2 mx-2">
                  <label>Tanggal Disetujui</label>
                  <p className="bg-slate-300 rounded-md p-1 px-2">
                    {format(
                      "dd:MM:yyyy",
                      new Date(
                        detilHistorySetoran.history_setoran_masuk.tanggal_setoran_disetujui
                      )
                    )}
                  </p>
                  <label>Tanggal Setoran</label>
                  <p className="bg-slate-300 rounded-md p-1 px-2">
                    {format(
                      "dd:MM:yyyy",
                      new Date(
                        detilHistorySetoran.history_setoran_masuk.tanggal_setoran
                      )
                    )}
                  </p>
                  <label>Nama</label>
                  <p className="bg-slate-300 rounded-md p-1 px-2">
                    {detilHistorySetoran.nama}
                  </p>
                  <label>Jumlah Sampah Halus</label>
                  <p className="bg-slate-300 rounded-md p-1 px-2">
                    {detilHistorySetoran.history_setoran_masuk.sampah_halus}{" "}
                    <span>Kg.</span>
                  </p>
                  <label>Jumlah Sampah Kasar</label>
                  <p className="bg-slate-300 rounded-md p-1 px-2">
                    {detilHistorySetoran.history_setoran_masuk.sampah_kasar}{" "}
                    <span>Kg.</span>
                  </p>
                  <label>Jumlah Setoran</label>
                  <p className="bg-slate-300 rounded-md p-1 px-2">
                    {detilHistorySetoran.history_setoran_masuk.jumlah_setoran}{" "}
                    <span>Kg.</span>
                  </p>
                  <label>Jenis Sampah</label>
                  <p className="bg-slate-300 rounded-md p-1 px-2">
                    {detilHistorySetoran.history_setoran_masuk.jenis_sampah}
                  </p>
                  <label>Harga Sampah</label>
                  <p className="bg-slate-300 rounded-md p-1 px-2">
                    {detilHistorySetoran.history_setoran_masuk.harga_satuan}
                  </p>
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

export default HistorySetoranPage;
