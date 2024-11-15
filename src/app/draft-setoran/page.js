"use client"
import AdminLayout from "../components/adminLayout";
import { useState,useEffect } from "react";

const DraftSetoran = () => {
    const [popUp, setPopUp] = useState(false);
    return (
        <>
            <AdminLayout>
                <div className="ml-16 w-80">
                    <h1 className="text-center text-xl font-bold p-2">Draft Setoran Menunggu Acc</h1>
                    <div className="relative overflow-x-auto">
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
                                <tr className="bg-white border-b">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    Budiono Siregar
                                    </th>
                                    <td className="px-6 py-4">
                                    12-09-2024
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <button onClick={()=>setPopUp(true)} className="bg-primary py-1 px-3 rounded-md text-white text-center">Detil</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {popUp ? (
                    <div className="bg-background rounded-md relative bottom-20 py-5 mx-2">
                        <div className="flex justify-between p-2 mx-5">
                            <h1 className="w-96 text-center text-lg font-bold">Detil Setoran Nasabah</h1>
                            <button onClick={()=>setPopUp(false)} className="font-extrabold text-xl">X</button>
                        </div>
                        <div className="p-2 mx-2">
                            <label>Tanggal</label>
                            <p className="bg-slate-300 rounded-md p-1 px-2">12-09-2024</p>
                            <label>Nama</label>
                            <p className="bg-slate-300 rounded-md p-1 px-2">Budiono Siregar</p>
                            <label>Jumlah Sampah Halus</label>
                            <p className="bg-slate-300 rounded-md p-1 px-2">2 <span>Kg.</span></p>
                            <label>Jumlah Sampah Kasar</label>
                            <p className="bg-slate-300 rounded-md p-1 px-2">2 <span>Kg.</span></p>
                            <label>Jenis Sampah</label>
                            <p className="bg-slate-300 rounded-md p-1 px-2">Makanan</p>
                        </div>
                        <div className="flex justify-around w-72 mt-2">
                            <button className="text-center font-medium bg-accent py-1 w-20 rounded-md">Setujui</button>
                            <button className="text-center text-white font-medium bg-red-600 py-1 w-20 rounded-md">Tolak</button>
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
