"use client"
import AdminLayout from "../components/adminLayout";
import Statistik from "../components/statistik";

const Dashboard = () => {
    return (
        <>
        <AdminLayout>
            <div className="p-1">
                <Statistik/>
            </div>
        </AdminLayout>
        </>
    );
}
 
export default Dashboard;