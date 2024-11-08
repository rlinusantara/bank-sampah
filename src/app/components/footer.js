import Link from "next/link";
const Footer = () => {
  return (
    <footer className="bg-white rounded-lg shadow m-4 dark:bg-gray-800">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <p className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
        <span id="tahun" className="text-gray-300 pr-1">© {new Date().getFullYear()}</span>
        Bank Sampah RLI
        </p>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <Link href="#" className="hover:underline">
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
