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
        <div className=" xl:w-full flex justify-center">
            <form className="bg-slate-200 flex flex-col p-2 xl:p-4 xl:w-[90%] rounded-md">
                <label className="block lg:text-lg text-black font-medium">Tanggal</label>
                <input onChange={(e) => setData(e)} type="date" name="" id="" className="h-10 rounded-sm w-60 px-2 mb-2 text-black"/>
                <label className="block lg:text-lg text-black font-medium">Nasabah</label>
                <div className="flex items-center  mb-2">
                    <div className="bg-gray-400 px-4 w-36 py-2 rounded-l-md">
                        <select className="bg-gray-400 text-white focus:outline-none">
                        <option value="all">Pilih</option>
                        <option value="mockups">Mockups</option>
                        <option value="logos">Logos</option>
                        <option value="templates">Design Templates</option>
                        </select>
                    </div>
                    <div className="flex-grow bg-white px-4 py-2 rounded-r-md">
                        <input
                        type="text"
                        placeholder="Cari Nasabah"
                        className=" text-black focus:outline-none w-full"
                        />
                    </div>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-md">
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                </div>

                <div className="flex justify-between lg:w-[50%]">
                    <div>
                        <label className="block lg:text-lg text-black font-medium">Jumlah Sampah Halus</label>
                        <input type="number" name="" id="" className="h-10 rounded-sm mb-2 w-40 lg:w-72"/>
                        <label className="block lg:text-lg text-black font-medium">Jumlah Sampah Kasar</label>
                        <input type="number" name="" id="" className="h-10 rounded-sm mb-2 w-40 lg:w-72"/>
                    </div>
                    <div>
                        <label className="block lg:text-lg text-black font-medium">Jenis Sampah Halus</label>
                        <input type="text" name="" id="" className="h-10 rounded-sm mb-2 w-40 lg:w-72"/>
                        <label className="block lg:text-lg text-black font-medium">Jenis Sampah Kasar</label>
                        <input type="text" name="" id="" className="h-10 rounded-sm mb-2 w-40 lg:w-72"/>
                    </div>
                </div>
                <p className="block text-md text-black font-medium py-3">Harga Saat Ini : <span>250</span></p>
                <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Simpan</button>
            </form>
        </div>
        </>
    );
}
 
export default FormInputSampah;