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
import debounce from 'lodash.debounce'; // Add lodash.debounce

function Navbar() {
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [icon, setIcon] = useState(false);
    const [cart, setCart] = useState(0);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [sidebarOpen1, setSidebarOpen1] = useState(false);
    const sidebarRef = useRef(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const inputRef = useRef(null);
    const dropdownRef = useRef(null);
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();

    const handleCart = () => {
        setCart(cart + 1);
    };

    const handleClick = () => {
        setIcon(!icon);
    };

    // Use debounce for search input change
    const debouncedSearch = useRef(debounce(async (query) => {
        if (query.trim()) {
            try {
                const response = await fetch(`/api/search?query=${encodeURIComponent(query.trim())}`);
                const data = await response.json();
                if (data.success) {
                    setSearchResults(data.products);
                } else {
                    setSearchResults([]);
                }
            } catch (error) {
                console.error('Error fetching search results:', error);
                setSearchResults([]);
            }
        } else {
            setSearchResults([]);
        }
    }, 300)).current; // Debounce delay of 300ms

    const handleChange = (e) => {
        setSearch(e.target.value);
        debouncedSearch(e.target.value); // Call debounced function
    };

    const handleClickOutside = (event) => {
        if (inputRef.current && !inputRef.current.contains(event.target)) {
            setIcon(false);
            setSearch('');
            
        }
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setDropdownOpen(false);
        }
        if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
            setSidebarOpen(false);
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
    const toggleSidebar1 = () => {
        setSidebarOpen1(!sidebarOpen1);
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
                            </div> :
                            <div className={`absolute w-full bg-white border h-[100%] overflow-y-auto border-gray-300 shadow-lg mt-2 ${icon ? '' : 'hidden'}`}>
                                {searchResults.length > 0 ? (
                                    <ul>
                                        {searchResults.map((product) => (
                                            <li key={product._id} className="p-2 border-b hover:bg-gray-100">
                                                <Link to={`/product/${product._id}`} className="flex items-center">
                                                    <img src={product.thumbnail} alt={product.title} className="w-12 h-12 object-cover mr-2" />
                                                    <div className="text-sm">
                                                        <p className="font-semibold">{product.title}</p>
                                                        <p>{product.description.slice(0, 50)}...</p>
                                                    </div>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <div className="p-4 text-center">No results found</div>
                                )}
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
                                    {user && <Link to='/admin' className='block px-4 py-2 text-gray-800 hover:bg-gray-100'>Admin Panel</Link>}
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
                            onClick={toggleSidebar1}
                            className='text-2xl text-gray-800'
                        />
                        {sidebarOpen1 && (
                            <div className='absolute right-0 mt-2 bg-white border border-gray-200 shadow-lg rounded-lg w-48'>
                                <Link to='/category/1' className='block px-4 py-2 text-gray-800 hover:bg-gray-100'>Category 1</Link>
                                <Link to='/category/2' className='block px-4 py-2 text-gray-800 hover:bg-gray-100'>Category 2</Link>
                                <Link to='/category/3' className='block px-4 py-2 text-gray-800 hover:bg-gray-100'>Category 3</Link>
                            </div>
                        )}
                    </div>
                    
                </div>
            </div>
            <div className='w-full pb-4 pt-2 lg:hidden flex gap-3 bg-gray-100'>
            <div className='relative lg:hidden px-4 flex items-center'>
            <HiMenu
                onClick={toggleSidebar}
                className='text-3xl text-gray-800'
            />
            {sidebarOpen && (
                <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-end z-10'>
                    <div ref={sidebarRef} className='bg-white w-64 h-full shadow-lg'>
                        <div className='flex justify-between items-center p-4'>
                            <span className='text-xl font-bold'>Menu</span>
                            <RxCross2 className='text-2xl cursor-pointer' onClick={toggleSidebar} />
                        </div>
                        <ul className='p-4'>
                            <li><Link to='/profile' className='block py-2 text-gray-800 hover:bg-gray-100'>Profile</Link></li>
                            <li><Link to='/orders' className='block py-2 text-gray-800 hover:bg-gray-100'>Orders</Link></li>
                            {user && <li><Link to='/admin' className='block py-2 text-gray-800 hover:bg-gray-100'>Admin Panel</Link></li>}
                            <li><Link to='/address' className='block py-2 text-gray-800 hover:bg-gray-100'>Your Address</Link></li>
                            <li><Link to='/sign-in' className='block py-2 text-gray-800 hover:bg-gray-100' onClick={handleLogout}>Logout</Link></li>
                        </ul>
                    </div>

                </div>
            )}
        </div>
        <div className='lg:hidden block relative items-center w-[75%]'>
                    <span
                        className={`absolute transform -translate-y-1/2 text-xl top-1/2 ${icon ? '-translate-x-1/2 right-6 search z-10' : '-translate-x-1/2 left-[68%]'}`}
                        onClick={handleClick}
                    >
                        <IoSearch className='text-gray-700' />
                    </span>
                    <div
                        className={`absolute transform -translate-y-1/2 text-xl top-1/2 ${icon ? 'w-[80px] h-10 rounded-r-full bg-light-blue-200 -right-12 -translate-x-[60%] search' : 'hidden'}`}
                    ></div>
                    <input
                        type="text"
                        className='text-black h-[40px] w-full  rounded-full text-center border border-gray-300'
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
                            </div> :
                            <div className={`absolute w-full bg-white border h-[100%] overflow-y-auto border-gray-300 shadow-lg mt-0 ${icon ? '' : 'hidden'}`}>
                                {searchResults.length > 0 ? (
                                    <ul>
                                        {searchResults.map((product) => (
                                            <li key={product._id} className="p-2 border-b hover:bg-gray-100">
                                                <Link to={`/product/${product._id}`} className="flex items-center">
                                                    <img src={product.thumbnail} alt={product.title} className="w-12 h-12 object-cover mr-2" />
                                                    <div className="text-sm">
                                                        <p className="font-semibold">{product.title}</p>
                                                        <p>{product.description.slice(0, 50)}...</p>
                                                    </div>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <div className="p-4 text-center">No results found</div>
                                )}
                            </div>
                        }
                    </div>
                </div>
        </div>
            <ToastContainer />
        </div>
    );
}

export default Navbar;
