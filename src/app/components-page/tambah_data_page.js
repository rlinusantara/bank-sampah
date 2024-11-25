import FormInputSampah from "../components/formSampah";
import Layout from "../components/layout";
const TambahDataPage = ({ nasabah = [], hargaSatuan = 0 }) => {
  return (
    <>
      <Layout>
        <section className="ml-20">
          <h1 className="text-center xl:text-2xl font-bold p-3 font-nunito">
            FORM INPUT DATA BANK SAMPAH
          </h1>
          <FormInputSampah nasabah={nasabah} hargaSatuan={hargaSatuan} />
        </section>
      </Layout>
    </>
  );
};

export default TambahDataPage;
