import { Link } from "react-router-dom";

const Navbar = () => {

    //navigation options
    const navOptions = <>
        <li ><Link to='/'>Add Task</Link></li>
        <li ><Link to='/tasks'>All Tasks</Link></li>
    </>
    return (
        <div className="navbar z-10 mb-5 uppercase font-bold text-white  bg-primary">
            <div className="navbar-start w-96">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-black bg-opacity-60 z-10 rounded-box w-52">
                        {navOptions}
                    </ul>
                </div>
                <a className="btn btn-ghost normal-case text-xl">
                    <img className="w-8" src="logo.png" alt="" />
                    Task Manager
                </a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navOptions}
                </ul>
            </div>

        </div>
    );
};

export default Navbar;