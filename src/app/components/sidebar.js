import {
  ChevronFirst,
  ChevronLast,
  Users,
  ClipboardPlus,
  HandCoins,
  Banknote,
  LayoutDashboard,
  Egg,
  DatabaseBackup,
  FileClock,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
export default function SidebarAdmin() {
  const [expanded, setExpanded] = useState();
  const SidebarItem = ({ icon, text, active, alert, link }) => {
    return (
      <Link href={link}>
        <li
          className={`relative flex items-center p-2  h-12 lg:h-16 rounded-md cursor-pointer transition-colors group ${
            active
              ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
              : "hover:bg-indigo-50 text-gray-600"
          }`}
        >
          {icon}
          <span
            className={`overflow-hidden transition-all ${
              expanded ? "w-52 ml-3" : "w-0"
            }`}
          >
            {text}
          </span>
          {alert && (
            <div
              className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
                expanded ? "" : "top-2"
              }`}
            ></div>
          )}
          {!expanded && (
            <div
              className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
            >
              {text}
            </div>
          )}
        </li>
      </Link>
    );
  };

  return (
    <div>
      <div className="flex fixed h-full z-10">
        <aside className="h-full">
          <nav className="h-full flex flex-col bg-white border-r shadow-sm">
            <div className="p-4 pb-2 mb-3 flex justify-between items-center">
              <Image
                src="/logo.png"
                alt="logo"
                width={500}
                height={500}
                className={`overflow-hidden transition-all ${
                  expanded ? "w-24" : "w-0"
                }`}
              />
              <button
                onClick={() => setExpanded((curr) => !curr)}
                className="p-1.5 rounded-lg text-black bg bg-indigo-100"
              >
                {expanded ? (
                  <ChevronFirst size={30} />
                ) : (
                  <ChevronLast size={30} />
                )}
              </button>
            </div>

            <ul className="flex-1 px-3">
              <SidebarItem
                icon={<LayoutDashboard size={30} />}
                text="Dashboard"
                link="/admin/dashboard"
              />
              <SidebarItem
                icon={<ClipboardPlus size={30} />}
                text="Setoran Masuk"
                link="/admin/setoran-masuk"
              />
              <SidebarItem
                icon={<DatabaseBackup size={30} />}
                text="Draft Setoran"
                link="/admin/draft-setoran"
              />
              <SidebarItem
                icon={<HandCoins size={30} />}
                text="Penarikan Uang"
                link="/admin/penarikan-uang"
              />
              <SidebarItem
                icon={<Users size={30} />}
                text="Data Nasabah"
                link="/admin/data-nasabah"
              />
              <SidebarItem
                icon={<FileClock size={30} />}
                text="Riwayat Setoran"
                link="/admin/histori-setoran"
              />
              <SidebarItem
                icon={<Banknote size={30} />}
                text="Harga Sampah"
                link="/admin/harga-sampah"
              />
              <SidebarItem
                icon={<Egg size={30} />}
                text="Pendataan Telur BSF"
                link="/admin/data-nasabah"
              />
            </ul>
          </nav>
        </aside>
      </div>
    </div>
  );
}
