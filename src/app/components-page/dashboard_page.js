"use client";
import AdminLayout from "@/app/components/adminLayout";
import Grafik from "../components/grafik";
import Statistik from "../components/statistik";

const DashboardPage = ({ isLogin = false }) => {
  return (
    <>
      <AdminLayout isLogin={isLogin}>
        <div className="p-4 ml-16 lg:ml-20">
          <Statistik />
          <Grafik />
        </div>
      </AdminLayout>
    </>
  );
};

export default DashboardPage;
