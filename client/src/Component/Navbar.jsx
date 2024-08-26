import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { IoSearch } from "react-icons/io5";
import { MdOutlineShoppingCart } from "react-icons/md";
import { HiOutlineDotsVertical, HiMenu } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../Pages/Redux/userSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Navbar() {
    const [search, setSearch] = useState('');
    const [icon, setIcon] = useState(false);
    const [cart, setCart] = useState(0);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const inputRef = useRef(null);
    const dropdownRef = useRef(null);
    const [about, setAbout] = useState(false);
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();

    const handleCart = () => {
        setCart(cart + 1);
    };

    const handleClick = () => {
        setIcon(!icon);
    };

    const handleChange = (e) => {
        setSearch(e.target.value);
    };

    const handleClickOutside = (event) => {
        if (inputRef.current && !inputRef.current.contains(event.target)) {
            setIcon(false);
            setSearch('');
        }
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [icon, dropdownOpen]);

    const handleLogout = () => {
        toast.success('You are Logged Out from This device');
        setTimeout(() => {
            dispatch(logout());
        }, 1500);
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <div>
            <div className='bg-gray-50 shadow-md flex items-center justify-between lg:pl-12 pl-4 z-50 relative'>
                <div className='lg:h-[60px] flex justify-start items-center'>
                    <Link to='/'>
                        <div className='flex justify-center items-center gap-4 shadow-lg lg:mr-10 mr-2 lg:px-3 px-6 my-2 py-2 bg-white rounded-full'>
                            <img src='https://firebasestorage.googleapis.com/v0/b/e-com-ff1ce.appspot.com/o/logo.png?alt=media&token=ae807b0a-857b-45bd-8c4a-b895607b07bb' className='object-cover h-[30px] shadow-md rounded-full p-1 bg-black' alt='logo' />
                            <div className='text-[10px] font-bold text-gray-800'>
                                <p>E-Commerce</p>
                                <p>Website</p>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className='lg:flex hidden relative w-[45vw] h-[40px] items-center'>
                    <span
                        className={`absolute transform -translate-y-1/2 text-xl top-1/2 ${icon ? '-translate-x-1/2 right-6 search z-10' : '-translate-x-1/2 left-[58%]'}`}
                        onClick={handleClick}
                    >
                        <IoSearch className='text-gray-700' />
                    </span>
                    <div
                        className={`absolute transform -translate-y-1/2 text-xl top-1/2 ${icon ? 'w-[80px] h-10 rounded-r-full bg-light-blue-200 -right-12 -translate-x-[60%] search' : 'hidden'}`}
                    ></div>
                    <input
                        type="text"
                        className='text-black h-[40px] lg:w-[45vw] hidden lg:inline rounded-full text-center border border-gray-300'
                        id='search'
                        name='search'
                        value={search}
                        placeholder='Search'
                        onChange={handleChange}
                        ref={inputRef}
                        onClick={handleClick}
                    />
                    <div className={`${icon === true ? 'w-full h-[300px] flex z-30 absolute bg-white transform top-[3.1rem] ' : ''}`}>
                        {search === '' && !icon ?
                            <div className={`${icon === false ? 'hidden' : 'flex z-20'}`}>
                                Search
                            </div> :
                            <div className='w-full h-full flex justify-center items-center z-20 shadow-lg'>
                                <img src='https://static.vecteezy.com/system/resources/thumbnails/016/976/338/small/document-file-not-found-search-no-result-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-vector.jpg' alt='No results' />
                            </div>
                        }
                    </div>
                </div>
                <div className='flex justify-evenly lg:w-[30%] w-[50%] items-center lg:pr-10'>
                    {user ? (
                        <div className='relative'>
                            <button onClick={toggleDropdown}>
                                <img src={user.profile} alt="profile" className='w-8 h-8 rounded-full hidden lg:inline' />
                            </button>
                            {dropdownOpen && (
                                <div ref={dropdownRef} className='absolute right-0 mt-2 bg-white border border-gray-200 shadow-lg rounded-lg w-48'>
                                    <Link to='/profile' className='block px-4 py-2 text-gray-800 hover:bg-gray-100'>Profile</Link>
                                    <Link to='/orders' className='block px-4 py-2 text-gray-800 hover:bg-gray-100'>Orders</Link>
                                    {user &&
                                    <Link to='/admin' className='block px-4 py-2 text-gray-800 hover:bg-gray-100'>Admin Panel</Link>}
                                     <Link to='/address' className='block px-4 py-2 text-gray-800 hover:bg-gray-100'>Your Address</Link>
                                    <button onClick={handleLogout} className='block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100'>Logout</button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link to='/sign-in' className='mr-4 text-gray-800 hover:text-gray-900'>Sign-in</Link>
                    )}
                    {user && 
                    <div className='relative'>
                        <span className='absolute bg-red-500 text-white rounded-lg -bottom-2 w-5 h-5 text-center text-[13px] -right-2 font-extrabold'>{cart}</span>
                        <MdOutlineShoppingCart className='text-2xl text-gray-800' onClick={handleCart} />
                    </div>
                    }
                    <div
                        className='relative'
                        ref={dropdownRef}
                    >
                        <HiOutlineDotsVertical
                            className='text-xl cursor-pointer text-gray-800'
                            onClick={() => setAbout(!about)}
                        />
                        {about && (
                            <div className='absolute z-10 w-[250px] h-[300px] right-0 transform translate-y-5 bg-white shadow-lg p-4 text-center'>
                                {/* Dropdown content here */}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {/* Mobile and Tablet View */}
            <div className='lg:hidden flex items-center justify-center w-full mt-2 px-4'>
                <button
                    className='text-2xl flex justify-center items-center px-3 text-gray-800'
                    onClick={toggleSidebar}
                >
                    <HiMenu />
                </button>
                <div className='relative w-[90%]'>
                    <input
                        type="text"
                        className='text-black h-[40px] w-full rounded-full text-center border border-gray-300'
                        id='search-mobile'
                        name='search'
                        value={search}
                        placeholder='Search'
                        onChange={handleChange}
                        onClick={handleClick}
                    />
                    <button
                        className={`absolute transform -translate-y-1/2 text-xl top-1/2 right-0 ${icon ? '' : 'block'} bg-gray-500 p-2 rounded-full`}
                        onClick={handleClick}
                    >
                        <IoSearch className='text-white' />
                    </button>
                </div>
            </div>
            <div className={`fixed top-0 left-0 w-[250px] h-full bg-white shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out z-50`}>
                <div className='p-4'>
                    <button className='text-xl float-right' onClick={toggleSidebar}>
                        <RxCross2 />
                    </button>
                    <div className='flex flex-col items-center mt-10'>
                        <img src={user?.profile} alt="profile" className='w-24 h-24 rounded-full' />
                        <p className='mt-2 font-bold'>{user?.name}</p>
                        <Link to='/profile' className='mt-4 text-gray-800 hover:text-gray-900'>Profile</Link>
                        <Link to='/orders' className='mt-2 text-gray-800 hover:text-gray-900'>Orders</Link>
                        {user &&
                        <Link to='/admin' className='mt-2 text-gray-800 hover:text-gray-900'>Admin Panel</Link>}
                        <Link to='/address' className='mt-2 text-gray-800 hover:text-gray-900'>Your Address</Link>
                        <button onClick={handleLogout} className='mt-4 text-gray-800 hover:text-gray-900'>Logout</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
