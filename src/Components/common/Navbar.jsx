import React, { useEffect, useState } from 'react'
import logo from '../../assets/Logo/Logo-Full-Light.png'
import { Link, matchPath } from 'react-router-dom'
import { NavbarLinks } from '../../data/navbar-links'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AiOutlineShoppingCart } from "react-icons/ai";
import ProfileDropdown from '../core/Navbar/ProfileDropdown'
import { apiConnector } from '../../Services/apiConnector'
import { categories } from '../../Services/apis'
import { IoIosArrowDown } from "react-icons/io";
import { RiArrowDropDownLine } from "react-icons/ri";



// const subLinks = [
//     {
//         title: "Python",
//         link: "/catalog/python",
//     },
//     {
//         title: "Web dev",
//         link: "/catalog/web-development",
//     },
// ];

const Navbar = () => {
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const { totalItems } = useSelector((state) => state.cart);

    const location = useLocation();
    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname);
    }

    var tokenExist = false;
    if(token !== null){
        tokenExist = true;
    }

    const [subLinks, setSubLinks] = useState([]);

    const fetchSubLinks = async() => {
        try {
            const result = await apiConnector("GET", categories.CATAGORIES_API);
            // console.log("printing sublinks: ", result);
            setSubLinks(result.data.data);
        } catch (error) {
            console.log("could not fet category list", error);
        }
    }

    useEffect( () =>{
        fetchSubLinks();
    }, []);

    return (
        <div className={`${tokenExist ? "bg-richblack-800" : "bg-richblack-00"} flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700`}>
            <div className='flex flex-row w-11/12 max-w-maxContent justify-between items-center'>
                {/* Logo Image */}
                <Link to='/'>
                    <img src={logo} alt='logo' width={160} height={42} loading='lazy'></img>
                </Link>

                {/* Navbar Link */}
                <nav >
                    <ul className='flex gap-6 text-white'>
                        {
                            NavbarLinks.map((navLink, index) => (
                                <li key={index}>
                                    {
                                        navLink.title === "Catalog" ? (
                                        <div className='relative flex gap-1 items-center group'>
                                            {navLink.title}
                                            <IoIosArrowDown />

                                            <div className='absolute invisible left-[50%] top-[50%] translate-x-[-50%] translate-y-[40%] flex flex-col opacity-0 transition-all duration-200 rounded-md bg-richblack-5 text-richblack-900 p-4 group-hover:visible group-hover:opacity-100 w-[200px] lg:w-[300px] z-10'>

                                                <div className='absolute top-0 left-[50%] translate-x-[80%] translate-y-[-45%] h-6 w-6 rotate-45 rounded bg-richblack-5 '>
                                                </div>

                                                {
                                                    subLinks.length ? (
                                                        subLinks.map((link, index) => {
                                                            return (
                                                                <Link key={index} to={`/catalog/${link.categoryName}`}>
                                                                    {link.categoryName}
                                                                </Link>
                                                            )
                                                        })
                                                    ) : (<div />)
                                                
                                                }
                                            </div>

                                        </div>
                                        ) : (
                                            <Link to={navLink?.path}>
                                                <p className={`${matchRoute(navLink?.path) ? "text-yellow-25" : "text-richblack-25"}`}>
                                                    {navLink.title}
                                                </p>
                                            </Link>
                                        )
                                    }
                                </li>
                            ))
                        }
                    </ul>
                </nav>

                {/* Login/ SignUp/ Dashboard */}
                <div className='flex gap-x-4 items-center'>

                    {
                        user && user?.accountType !== "Instructor" && (
                            <Link to="dashboard/cart" className='relative'>
                                <p className='text-richblack-300 text-xl'>
                                    <AiOutlineShoppingCart />
                                </p>
                                {
                                    totalItems > 0 && (
                                        <div className='absolute top-0 right-0 w-4 h-4 bg-pink-500 rounded-full flex justify-center items-center text-white text-sm'>
                                            {totalItems}
                                        </div>
                                    )
                                }
                            </Link>
                        )
                    }

                    {
                        token === null && (
                            <Link to="/login">
                                <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[4px] text-richblack-100 rounded-md'>
                                    Login
                                </button>
                            </Link>
                        )
                    }
                    {
                        token === null && (
                            <Link to="/signup">
                                <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[4px] text-richblack-100 rounded-md'>
                                    Signup
                                </button>
                            </Link>
                        )
                    }
                    {
                        token !== null && <ProfileDropdown />
                    }

                </div>

            </div>
        </div>
    )
}

export default Navbar