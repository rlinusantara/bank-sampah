import SidebarAdmin from "./Sidebar";

const AdminLayout = ({children}) => {
    return (
        <>
            <div className="flex flex-grow w-screen md:w-full min-h-screen">
                <SidebarAdmin/>
                <div>
                    {children}
                </div>
            </div>
        </>
    );
}
 
export default AdminLayout;