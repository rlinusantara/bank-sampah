import Link from "next/link";
const Footer = () => {
  return (
    <footer className="bg-primary rounded-lg shadow m-4  font-nunito">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <p className="text-sm text-white sm:text-center">
        <span id="tahun" className="text-white pr-1">© {new Date().getFullYear()}</span>
        Bank Sampah RLI
        </p>
        <hr/>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-white  sm:mt-0">
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
