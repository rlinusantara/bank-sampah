import Link from "next/link";
import Image from "next/image";
const Header = () => {
  return (
    <>
      <header>
        <div className="font-nunito">
          <nav className="bg-accent border-gray-200">
            <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
              <Link
                href="/"
                className="flex items-center space-x-3 rtl:space-x-reverse"
              >
                <Image
                  src="/logo.png"
                  alt="logo"
                  width={60}
                  height={60}
                  priority
                  style={{ width: "100%", height: "auto" }} // optional
                />
                <span className="self-center text-2xl font-bold whitespace-nowrap text-white">
                  Bank Sampah RLI
                </span>
              </Link>
            </div>
          </nav>
          <nav className="bg-primary">
            <div className="max-w-screen-xl px-4 py-3 mx-auto">
              <div className="flex items-center">
                <ul className="flex flex-row font-medium mt-0 space-x-5 rtl:space-x-reverse text-sm">
                  <li>
                    <Link
                      href="/tambah-data"
                      prefetch={true}
                      className="text-gray-900 dark:text-white hover:underline"
                      aria-current="page"
                    >
                      Tambah Data
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/grafik"
                      prefetch={true}
                      className="text-gray-900 dark:text-white hover:underline"
                    >
                      Grafik
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/daftar-nasabah"
                      prefetch={true}
                      className="text-gray-900 dark:text-white hover:underline"
                    >
                      Daftar Nasabah
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/admin/login"
                      prefetch={true}
                      className="text-gray-900 dark:text-white hover:underline"
                    >
                      Dashboard
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
