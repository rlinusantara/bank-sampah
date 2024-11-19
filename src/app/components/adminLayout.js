import DashNav from "./dashNav";
import SidebarAdmin from "./sidebar";

const AdminLayout = ({children}) => {
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
}
 
export default AdminLayout;