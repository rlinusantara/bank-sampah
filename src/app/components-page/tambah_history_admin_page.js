import AdminLayout from "../components/adminLayout";
import FormInputHistory from "../components/formInputHistory";

const TambahDataHistoryAdminPage = ({
  nasabah = [],
  hargaSatuan = 0,
  isLogin = false,
}) => {
  return (
    <>
      <AdminLayout isLogin={isLogin}>
        <section className="ml-20">
          <h1 className="text-center xl:text-2xl font-bold p-3 font-nunito">
            FORM INPUT DATA BANK SAMPAH
          </h1>
          <FormInputHistory nasabah={nasabah} hargaSatuan={hargaSatuan} />
        </section>
      </AdminLayout>
    </>
  );
};

export default TambahDataHistoryAdminPage;
