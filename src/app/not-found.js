import Layout from "./components/layout";
import Link from "next/link";
const NotFountPage = () => {
  return (
    <section>
      <Layout>
          <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
            <div className="mx-auto max-w-screen-sm text-center">
              <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 ">
                404
              </h1>
              <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl">
                Halaman tidak ditemukan
              </p>
              <p className="mb-4 text-lg font-light text-gray-500 ">
               Maaf halaman yang anda cari tidak ditemukan
              </p>
              <Link
                href="/"
                className="bg-accent inline-flex text-white bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Kembali ke halaman utama
              </Link>
            </div>
          </div>
      </Layout>
    </section>
  );
};

export default NotFountPage;
