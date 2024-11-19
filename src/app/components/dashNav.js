"use client";

import axios from "axios";
import { LogOut } from "lucide-react";
import { useState } from "react";
import SpinnerLoading from "./spinner";
import { useRouter } from "next/navigation";

const DashNav = () => {
  const [btnLoading, setBtnLoading] = useState(false);
  const [btnDisable, setBtnDisable] = useState(false);
  const router = useRouter();

  const btnLogout = async () => {
    try {
      setBtnLoading(true);
      setBtnDisable(true);
      await axios.post("/api/logout");
      setBtnLoading(false);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <header className="bg-white w-full sticky top-0 py-2 px-3 z-10 flex justify-end">
        <button
          className="cursor-pointer flex"
          onClick={btnLogout}
          disabled={btnDisable}
        >
          {btnLoading ? (
            <SpinnerLoading w="w-6" h="h-6" />
          ) : (
            <>
              <section className="px-2">Keluar</section>
              <LogOut />
            </>
          )}
        </button>
      </header>
    </>
  );
};

export default DashNav;
