import { Outlet } from "react-router-dom";
// import Navbar from "../Pages/Home/Shared/Navbar/Navbar";



const Main = () => {
    return (
        <div className="mx-auto max-w-6xl">
            {/* <Navbar></Navbar> */}
            <Outlet></Outlet>
            {/* <Footer></Footer> */}
        </div>
    );
};

export default Main;