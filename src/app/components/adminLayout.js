"use client";
import { useEffect, useState } from "react";
import DashNav from "./dashNav";
import SidebarAdmin from "./sidebar";
import SpinnerLoading from "./spinner";
import { useRouter } from "next/navigation";

const AdminLayout = ({ children, isLogin }) => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(
    function () {
      if (isLogin) {
        setIsLoading(false);
      } else {
        router.push("/admin/login");
      }
    },
    [isLogin]
  );

  if (isLoading) {
    return (
      <section className="w-full bg-white h-[100vh] flex justify-center items-center">
        <SpinnerLoading />
      </section>
    );
  }

  return (
    <>
      <div className="w-full lg:w-full min-h-screen bg-slate-200">
        <DashNav />
        <div className="flex flex-grow ">
          <SidebarAdmin />
          <div className="p-1">{children}</div>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
