import Link from "next/link";

const Jumbotron = () => {
  return (
    <section className="font-nunito bg-center bg-[url('/bg.webp')] h-screen bg-no-repeat">
      <div className="px-4 mx-auto max-w-screen-xl text-center xl:text-left py-24 lg:py-56">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-primary md:text-5xl lg:text-7xl">
          Mau nabung sampah?
        </h1>
        <p className="mb-8 text-lg font-normal text-primary lg:text-xl sm:px-16 lg:px-48 xl:p-0 xl:w-96">
          Dengan menabung sampah, anda membantu menjaga lingkungan
        </p>
        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center xl:justify-start sm:space-y-0">
          <Link
            href="/tambah-data"
            prefetch={true}
            className="inline-flex justify-center items-center py-3 px-5 text-xl font-medium text-center text-white rounded-lg bg-accent hover:bg-primary"
          >
            Isi Sekarang
            <svg
              className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Jumbotron;
