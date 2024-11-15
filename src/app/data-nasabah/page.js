"use client"
import AdminLayout from "../components/adminLayout";

const DaftarNasabah = () => {
    return (
        <>
            <AdminLayout>
            <div className="ml-16 w-80">
                    <h1 className="text-center text-xl font-bold p-2">Data Nasabah</h1>
                    <div className="relative overflow-x-auto">
                        <table className="w-full text-sm rtl:text-right text-gray-500 table-fixed text-center">
                            <thead className="text-xs text-gray-700 bg-accent ">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Nama
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Total Saldo
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Total Sampah
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-white border-b">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    Budiono Siregar
                                    </th>
                                    <td className="px-6 py-4">
                                    100.000
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        99 <span>Kg.</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
            </AdminLayout>
        </>
    );
}
 
export default DaftarNasabah;