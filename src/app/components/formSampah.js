"use client"
import { useEffect, useState } from "react";
import axios from "axios";
const FormInputSampah = () => {
    const [tanggal, setTanggal] = useState('')
    const [nasabah,setNasabah] = useState([])
    useEffect(function(){
        const getNasabah = async () => {
            try {
                const response = await axios.get('/api/nasabah');
                console.log(response)
            } catch (error) {
             console.log("error")
            }
        };
        getNasabah()
    },[])
    function setData(e){
        const tanggal = e.target.value;
        setTanggal(tanggal)
        console.log(tanggal)
    }
    return (
        <>
        <div className=" xl:w-full flex justify-center font-nunito">
            <form className="bg-accent flex flex-col mx-2 p-2 xl:p-4 xl:w-[90%] w-full rounded-xl">
                <label className="block lg:text-lg text-black font-medium ">Tanggal</label>
                <input onChange={(e) => setData(e)} type="date" name="" id="" className="h-10 rounded-lg px-2 mb-2 text-black"/>
                <label className="block lg:text-lg text-black font-medium">Nasabah</label>
                <div className="flex items-center  mb-2">
                    <div className="bg-gray-400 px-4 w-20 py-2 rounded-l-lg">
                        <select className="bg-gray-400 text-white">
                        <option value="all">Pilih</option>
                        <option value="mockups">Mockups</option>
                        <option value="logos">Logos</option>
                        <option value="templates">Design Templates</option>
                        </select>
                    </div>
                    <div className="flex-grow bg-white px-4 py-2 rounded-r-lg">
                        <input
                        type="text"
                        placeholder="Cari Nasabah"
                        className=" text-black focus:outline-none w-full"
                        />
                    </div>
                </div>

                <div className="">
                    <label className="block lg:text-lg text-black font-medium">Jumlah Sampah Halus</label>
                    <input type="number" name="" id="" className="h-10 rounded-lg mb-2 w-full lg:w-72"/>
                    <label className="block lg:text-lg text-black font-medium">Jumlah Sampah Kasar</label>
                    <input type="number" name="" id="" className="h-10 rounded-lg mb-2 w-full lg:w-72"/>
                    <label className="block lg:text-lg text-black font-medium">Jenis Sampah</label>
                    <input type="text" name="" id="" className="h-10 rounded-lg mb-2 w-full lg:w-72"/>
                </div>
                <p className="block text-md text-black font-medium py-3">Harga Saat Ini : <span>250</span></p>
                <button type="button" className="text-white bg-primary font-bold rounded-lg text-base px-5 py-2.5 me-2 mb-2">Simpan</button>
            </form>
        </div>
        </>
    );
}
 
export default FormInputSampah;