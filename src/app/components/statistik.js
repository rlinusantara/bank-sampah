import { UsersRound, Weight, CircleDollarSign,} from "lucide-react";
const Statistik = () => {
    return (
        <div className="flex p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-7xl">
                <div className="bg-white p-6 lg:p-8 w-64 lg:h-40 h-32 lg:w-96 rounded-lg border border-cyan shadow-lg transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                    <div className="flex items-center">
                        <UsersRound className="w-6 h-6 lg:w-8 lg:h-8 text-blue-500" />
                        <span className="ml-3 font-medium text-base lg:text-lg text-gray-700">Jumlah Nasabah</span>
                    </div>
                    <div className="text-2xl lg:text-3xl xl:text-4xl font-bold mt-4 text-gray-900">100</div>
                </div>

                <div className="bg-white p-6 lg:p-8 w-64 lg:h-40 h-32 lg:w-96 rounded-lg border border-cyan shadow-lg transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                    <div className="flex items-center">
                        <Weight className="w-6 h-6 lg:w-8 lg:h-8 text-blue-500" />
                        <span className="ml-3 font-medium text-base lg:text-lg text-gray-700">Total Sampah (Kg.)</span>
                    </div>
                    <div className="text-2xl lg:text-3xl xl:text-4xl font-bold mt-4 text-gray-900">1,000 Kg.</div>
                </div>

                <div className="bg-white p-6 lg:p-8 w-64 lg:h-40 h-32 lg:w-96 rounded-lg border border-cyan shadow-lg transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                    <div className="flex items-center">
                        <CircleDollarSign className="w-6 h-6 lg:w-8 lg:h-8 text-blue-500" />
                        <span className="ml-3 font-medium text-base lg:text-lg text-gray-700">Total Uang Nasabah</span>
                    </div>
                    <div className="text-2xl lg:text-3xl xl:text-4xl font-bold mt-4 text-gray-900">145</div>
                </div>
            </div>
        </div>
    );
}

export default Statistik;