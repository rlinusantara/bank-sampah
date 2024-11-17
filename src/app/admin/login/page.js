"use client";
import { useState } from "react";
import axios from "axios";
import SpinnerLoading from "@/app/components/spinner";
import { redirect } from "next/navigation";
import { useRef } from "react";

const Login = () => {
  const [showHidePassword, setShowHidePassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);
  const [btnDisable, setBtnDisable] = useState(false);
  const form = useRef();
  const [msg, setMsg] = useState({});
  const [showMsg, setShowMsg] = useState("-translate-x-full");

  const submit = async (e) => {
    try {
      e.preventDefault();
      setBtnLoading(true);
      setBtnDisable(true);

      const data = await axios.post("/api/login", {
        username,
        password,
      });

      setTimeout(() => {
        setBtnLoading(false);
        form.current.reset();

        setMsg({
          title: "Success",
          text: data.data.message,
          textColor: "text-green-800",
          bgColor: "bg-green-100 ",
        });
        setShowMsg("-translate-x-0");

        setTimeout(() => {
          redirect("/admin/dashboard");
        }, 1000);
      }, 2000);
    } catch (error) {
      setBtnLoading(false);
      setBtnDisable(false);
      let resMsg = "";
      if (error?.response?.data?.errors) {
        resMsg = error.response.data.errors.join("\n\n");
      } else {
        resMsg = error.message;
      }

      setMsg({
        title: "Error",
        text: resMsg,
        textColor: "text-red-800",
        bgColor: "bg-red-100 ",
      });
      setShowMsg("-translate-x-0");
    }
  };

  return (
    <section className="h-[100vh] flex justify-center items-center">
      <section className="w-10/12 relative overflow-hidden pt-16">
        <div
          className={`duration-300 transition-all p-4 mb-4 ${msg?.textColor} rounded-lg ${msg?.bgColor} absolute top-0 ${showMsg}  w-fit`}
          role="alert"
        >
          <span className="font-semibold">{msg?.title}: </span> {msg?.text}
        </div>

        <h1 className="font-medium text-center">Silahkan login</h1>

        <form className="w-full" onSubmit={submit} ref={form}>
          <div className="mb-5">
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Username
            </label>
            <input
              type="username"
              id="username"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 outline-none"
              required
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Password
            </label>
            <section className="flex items-center justify-center gap-2">
              <input
                type={showHidePassword ? "text" : "password"}
                id="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 outline-none"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <i
                className={`fa-solid cursor-pointer ${
                  showHidePassword ? "fa-eye-slash" : "fa-eye"
                }`}
                onClick={() => setShowHidePassword(!showHidePassword)}
              />
            </section>
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-lg w-full sm:w-auto px-5 py-2.5 text-center flex justify-center items-center"
            disabled={btnDisable}
          >
            {btnLoading ? <SpinnerLoading w="w-6" h="h-6" /> : "Login"}
          </button>
        </form>
      </section>
    </section>
  );
};

export default Login;
