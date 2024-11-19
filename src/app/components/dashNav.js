import {LogOut} from "lucide-react"
const DashNav = () => {
    return (
        <>
            <header className="bg-white w-full sticky top-0 py-2 px-3 z-10 flex justify-end">
                <button className="px-2">Keluar</button>
                <LogOut/>
            </header>
        </>
    );
}
 
export default DashNav;