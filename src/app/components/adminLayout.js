import { useEffect, useState } from "react";
import DashNav from "./dashNav";
import SidebarAdmin from "./sidebar";
import axios from "axios";
import SpinnerLoading from "./spinner";
import { useRouter } from "next/navigation";

const AdminLayout = ({ children }) => {
  const [isLoading, setIsloading] = useState(true);
  const router = useRouter();

  useEffect(function () {
    axios
      .post("/api/admin/islogin")
      .then(() => {
        setIsloading(false);
      })
      .catch(() => {
        router.push("/admin/login");
      });
  }, []);

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
            <DashNav/>
            <div className="flex flex-grow ">
                <SidebarAdmin/>
                <div className="p-1">
                    {children}
                </div>
            </div>
        </div>
    </>
  );
};

export default AdminLayout;
