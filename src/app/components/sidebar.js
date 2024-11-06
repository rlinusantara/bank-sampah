import { ChevronFirst, ChevronLast,Database,UserRoundPlus,TicketPlus,HandCoins,Banknote, LayoutDashboard } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
export default function SidebarAdmin() {
  const [expanded, setExpanded] = useState();

  // eslint-disable-next-line react/prop-types
  const SidebarItem = ({ icon, text, active, alert ,link}) => {
    return (
    <Link href={link}>
      <li className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${
        active
          ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
          : "hover:bg-indigo-50 text-gray-600"
      }`}>
        {icon}
        <span className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}>
          {text}
        </span>
        {alert && (
          <div className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${expanded ? "" : "top-2"}`}></div>
        )}
        {/* {!expanded && (
          <div className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}>
            {text}
          </div>
        )} */}
      </li>
      </Link>
    );
  };

  return (
    <div className="flex">
      <aside className="h-screen">
        <nav className="h-full flex flex-col bg-white border-r shadow-sm">
          <div className="p-4 pb-2 flex justify-between items-center">
            <Image
              src="/logo.png"
              alt="logo"
              width={500}
              height={500}
              className={`overflow-hidden transition-all ${expanded ? "w-24" : "w-0"}`}
            />
            <button
              onClick={() => setExpanded((curr) => !curr)}
              className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
            >
              {expanded ? <ChevronFirst /> : <ChevronLast />}
            </button>
          </div>

          <ul className="flex-1 px-3">
            <SidebarItem icon={<LayoutDashboard size={20}/>} text="Dashboard" link="/dashboard"/>
            <SidebarItem icon={<Database size={20} />} text="Data Nasabah" link="/data-nasabah" />
            <SidebarItem icon={<UserRoundPlus size={20} />} text="Tambah Nasabah" link="/data-nasabah" />
            <SidebarItem icon={<TicketPlus size={20} />} text="Setoran Masuk" link="/data-nasabah" />
            <SidebarItem icon={<HandCoins size={20} />} text="Setoran Keluar" link="/data-nasabah" />
            <SidebarItem icon={<Banknote size={20}/>} text="Harga Sampah" link="/data-nasabah" />
          </ul>
        </nav>
      </aside>
    </div>

  );
}