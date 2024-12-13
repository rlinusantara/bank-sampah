"use client";
import AdminLayout from "@/app/components/adminLayout";
import SpinnerLoading from "@/app/components/spinner";
import formatRupiah from "@/helpers/formatRupiah";
import axios from "axios";
import { useRef, useState } from "react";
import PopUpError from "../components/popUpError";

const HargaSampahPage = ({ defaultHarga = 0, isLogin = false }) => {
  const [popUp, setPopUp] = useState(false);
  const [harga, setHarga] = useState(0);
  const [btnDisable, setBtnDisable] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);

  const [btnConfirmDisable, setBtnConfirmDisable] = useState(false);
  const [msgError, setMsgError] = useState("");
  const showHargaTag = useRef();
  const form = useRef();

  const btnUbahHarga = async (e) => {
    try {
      e.preventDefault();
      setBtnDisable(true);
      setBtnLoading(true);
      setBtnConfirmDisable(true);

      await axios.put(
        "/api/admin/harga-sampah",
        {
          harga_satuan: harga,
        },
        {
          withCredentials: true,
        }
      );

      setTimeout(() => {
        setBtnDisable(false);
        setBtnLoading(false);
        setBtnConfirmDisable(false);
        setBtnDisable(false);
        setPopUp(false);
        form.current.reset();
        showHargaTag.current.textContent = formatRupiah(harga);
      }, 500);
    } catch (error) {
      setBtnDisable(false);
      setBtnLoading(false);
      setBtnConfirmDisable(false);
      setBtnDisable(false);
      setPopUp(false);
      setMsgError(error.message);
    }
  };

  return (
    <>
      {msgError ? <PopUpError msgError={msgError} /> : ""}
      <AdminLayout isLogin={isLogin}>
        <div className="w-[280px] ml-[73px]">
          <h1 className="text-center text-xl font-bold p-2">Harga Sampah</h1>
          <div className="bg-accent rounded-md p-2">
            <div className="">
              <h1 className="text-center text-xl font-bold p-2">Ubah Harga</h1>
              <label>Harga Saat ini :</label>
              <p className="bg-background p-2 rounded-lg" ref={showHargaTag}>
                {formatRupiah(defaultHarga)}
              </p>
            </div>
            <form
              ref={form}
              className="flex flex-col"
              onSubmit={(e) => {
                e.preventDefault();
                setPopUp(true);
                setBtnDisable(true);
              }}
            >
              <label className="block lg:text-lg text-black font-medium">
                Harga
              </label>
              <input
                type="number"
                className="h-10 rounded-lg mb-2 px-2 w-full xl:w-full text-black"
                required
                step="any"
                min={1}
                onChange={(e) => setHarga(+e.target.value)}
              />
              <button
                disabled={btnDisable}
                type="submit"
                className="text-white bg-primary font-bold rounded-lg text-base px-5 py-2.5 me-2 mt-2"
              >
                Ubah
              </button>
            </form>
          </div>
        </div>
        {popUp ? (
          <div className="w-full h-screen fixed top-0 layar-hitam flex justify-center items-center">
            <div>
              <div className="ml-[73px] flex-col p-4 bg-background rounded-md">
                <h1 className="text-center ">Konfirmasi Perubahan</h1>
                <div className="flex justify-around p-4 w-full mt-7">
                  <button
                    onClick={btnUbahHarga}
                    className="bg-accent px-8 py-1 rounded-md mx-2 text-white"
                    disabled={btnConfirmDisable}
                  >
                    {btnLoading ? <SpinnerLoading w="w-5" h="h-5" /> : "Ya"}
                  </button>
                  <button
                    disabled={btnConfirmDisable}
                    onClick={() => {
                      setPopUp(false);
                      setBtnDisable(false);
                    }}
                    className="bg-red-600 px-4 py-1 rounded-md mx-2 text-white"
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
      </AdminLayout>
    </>
  );
};

export default HargaSampahPage;
