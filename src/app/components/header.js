import Link from "next/link";

const Header = () => {
    return (
        <>
        <header>
            <div className="font-nunito">
            <nav className="bg-accent border-gray-200">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
                <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
                    <span className="self-center text-2xl font-bold whitespace-nowrap text-white">Bank Sampah RLI</span>
                </Link>
                </div>
            </nav>
            <nav className="bg-primary">
                <div className="max-w-screen-xl px-4 py-3 mx-auto">
                <div className="flex items-center">
                    <ul className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
                    <li>
                        <Link href="/tambah-data" className="text-gray-900 dark:text-white hover:underline" aria-current="page">Tambah Data</Link>
                    </li>
                    <li>
                        <Link href="/grafik" className="text-gray-900 dark:text-white hover:underline">Grafik</Link>
                    </li>
                    </ul>
                </div>
                </div>
            </nav>
            </div>

        </header>
        </>
    );
}
 
export default Header;