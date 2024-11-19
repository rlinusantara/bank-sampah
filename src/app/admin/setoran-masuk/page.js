"use client"
import AdminLayout from "../../components/adminLayout";
import FormInputSampah from "../../components/formSampah";

const SetoranMasuk = () => {
    return (
        <>
        <AdminLayout>
            <div className="w-80 ml-[78px] xl:w-[100%] xl:relative xl:left-32">
                <h1 className="text-center font-bold text-xl p-2">Form Tambah Setoran</h1>
            <FormInputSampah/>
            </div>/
        </AdminLayout>
        </>
    );
}
 
export default SetoranMasuk;