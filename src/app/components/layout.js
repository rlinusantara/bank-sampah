import Header from "./header";
import Footer from "./footer";
const Layout = ({children}) => {
    return (
        <>
        <Header/>
        <div className="flex flex-col flex-grow w-screen md:w-full min-h-screen">
            {children}
        </div>
        <Footer/>
        </>
    );
}
 
export default Layout;