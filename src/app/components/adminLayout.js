import SidebarAdmin from "./sidebar";

const AdminLayout = ({children}) => {
    return (
        <>
            <div className="flex flex-grow w-full lg:w-full min-h-screen bg-slate-200">
                <SidebarAdmin/>
                <div className="p-1">
                    {children}
                </div>
            </div>
        </>
    );
}
 
export default AdminLayout;