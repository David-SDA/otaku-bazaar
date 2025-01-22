import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { faUser, faClipboardList, faMagnifyingGlass, faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import logo from '../../assets/logo/logo.jpg';
import { useAuth } from '../../context/AuthContext';

export default function Header(){
    const { isAuthenticated, user, logout } = useAuth();
    const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
    const [categories, setCategories] = useState([]);
    const [isUserModalOpen, setUserModalOpen] = useState(false);
    const navigate = useNavigate();

    function handleToggleBurgerMenu(){
        setIsBurgerMenuOpen(!isBurgerMenuOpen)
    }

    function handleResize(){
        setIsMobile(window.innerWidth < 1024);
        setUserModalOpen(false);
    }

    async function fetchCategories(){
        try{
            const response = await fetch('http://localhost:8000/categories');
            if(!response.ok){
                throw new Error('Error fetching categories');
            }
            const data = await response.json();
            setCategories(data);
        }
        catch(error){
            console.error('Error fetching categories:', error);
        }
    }

    async function handleLogout(){
        try{
            const response = await fetch('http://localhost:8000/auth/logout', {
                method: 'POST',
                credentials: 'include'
            });
            if(!response.ok){
                throw new Error('Error logging out');
            }
            await logout();
            navigate('/login');
        }
        catch(error){
            console.error('Error logging out:', error);
        }
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    });

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        if(isBurgerMenuOpen && isMobile){
            document.body.style.overflow = 'hidden';
        }
        else{
            document.body.style.overflow = '';
        }

        return () => document.body.style.overflow = '';
    }, [isBurgerMenuOpen, isMobile]);

    useEffect(() => {
        function handleClickOutside(event){
            if(isUserModalOpen && !event.target.closest('.user-modal')){
                setUserModalOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
    
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isUserModalOpen]);    

    function handleUserClick(){
        setUserModalOpen(!isUserModalOpen);
    }

    function closeUserModal(){
        setUserModalOpen(false);
    }

    return (
        <header className='h-24 py-2 shadow-md font-bold flex items-center relative'>
            <nav className='container mx-auto px-4 flex justify-between items-center'>
                <div className='flex items-center'>
                    <NavLink to={`/`}>
                        <img src={logo} alt='Logo' className='h-12 me-8' />
                    </NavLink>
                    {!isMobile && (
                        <>
                            {
                                categories.slice(0, 4).map((category) => (
                                    <NavLink to={`/search`} className='hidden lg:inline mx-4 py-1 group relative' key={category.id}>
                                        {category.name}
                                        <span className='absolute -bottom-1 left-1/2 w-0 transition-all h-0.5 bg-primary group-hover:w-1/2'></span>
                                        <span className='absolute -bottom-1 right-1/2 w-0 transition-all h-0.5 bg-primary group-hover:w-1/2'></span>
                                    </NavLink>
                                ))
                            }
                            <NavLink to={`/categories`} className='hidden lg:inline mx-4 py-1 group relative'>
                                More
                                <span className='absolute -bottom-1 left-1/2 w-0 transition-all h-0.5 bg-primary group-hover:w-1/2'></span>
                                <span className='absolute -bottom-1 right-1/2 w-0 transition-all h-0.5 bg-primary group-hover:w-1/2'></span>
                            </NavLink>
                        </>
                    )}
                </div>
                {!isMobile && (
                    <>
                        <div className='hidden lg:block space-x-6'>
                            <NavLink to={`/search`} className='group relative py-1'>
                                <FontAwesomeIcon icon={faMagnifyingGlass} size='lg' />
                                <span className='absolute -bottom-1 left-1/2 w-0 transition-all h-0.5 bg-primary group-hover:w-1/2'></span>
                                <span className='absolute -bottom-1 right-1/2 w-0 transition-all h-0.5 bg-primary group-hover:w-1/2'></span>
                            </NavLink>
                            {
                                isAuthenticated && (
                                    <NavLink to={`/wishlist`} className='group relative py-1'>
                                        <FontAwesomeIcon icon={faClipboardList} size='lg'/>
                                        <span className='absolute -bottom-1 left-1/2 w-0 transition-all h-0.5 bg-primary group-hover:w-1/2'></span>
                                        <span className='absolute -bottom-1 right-1/2 w-0 transition-all h-0.5 bg-primary group-hover:w-1/2'></span>
                                    </NavLink>
                                )
                            }
                            <div className='relative inline-block'>
                                <div onClick={handleUserClick} className='cursor-pointer'>
                                    <FontAwesomeIcon icon={faUser} size='lg' />
                                </div>
                                {
                                    isUserModalOpen && (
                                        <div className='absolute right-0 mt-2 bg-white shadow-md rounded-lg p-4 z-50 w-48 user-modal'>
                                            {
                                                isAuthenticated ? (
                                                    <>
                                                        <NavLink to={`/profile/${user.sub}`} onClick={() => closeUserModal()} className='block py-2 px-3 hover:bg-gray-200 rounded'>My Profile</NavLink>
                                                        <NavLink to={'/profile'} onClick={() => closeUserModal()} className='block py-2 px-3 hover:bg-gray-200 rounded'>Settings</NavLink>
                                                        <button onClick={() => {closeUserModal(); handleLogout();}} className='block py-2 px-3 w-full text-left hover:bg-gray-200 rounded'>Logout</button>
                                                    </>
                                                ) : (
                                                    <>
                                                        <NavLink to={'/login'} onClick={() => closeUserModal()} className='block py-2 px-3 hover:bg-gray-200 rounded'>Login</NavLink>
                                                        <NavLink to={'/register'} onClick={() => closeUserModal()} className='block py-2 px-3 hover:bg-gray-200 rounded'>Register</NavLink>
                                                    </>
                                                )
                                            }
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </>
                )}
                {!isBurgerMenuOpen && (
                    <div className='block bg-primary py-2 px-3 rounded-md cursor-pointer lg:hidden' onClick={handleToggleBurgerMenu}>
                        <FontAwesomeIcon icon={faBars} size='2xl' />
                    </div>
                )}
                {isMobile && (
                    <>
                        <div className={`lg:hidden absolute top-0 right-0 h-screen w-80 py-5 z-50 bg-primary flex flex-col transition-transform duration-300 ${isBurgerMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
                            <FontAwesomeIcon icon={faXmark} size='2xl' className='mx-3 py-2 px-3 rounded-md bg-[#F4F6EE] self-end cursor-pointer' onClick={handleToggleBurgerMenu} />
                            {
                                categories.slice(0, 4).map((category) => (
                                    <NavLink to={`/search`} className='w-full py-3 text-center' key={category.id} onClick={handleToggleBurgerMenu}>
                                        {category.name}
                                    </NavLink>
                                ))
                            }
                            <NavLink to={`/categories`} className='w-full py-3 text-center' onClick={handleToggleBurgerMenu}>More</NavLink>
                            <div className='h-px w-11/12 bg-[#F4F6EE] mx-auto my-3'></div>
                            <div className='flex flex-col items-center'>
                                <NavLink to={`/search`} className='w-full py-3 text-center' onClick={handleToggleBurgerMenu}>Search</NavLink>
                                {
                                    isAuthenticated && (
                                        <NavLink to={`/wishlist`} className='w-full py-3 text-center' onClick={handleToggleBurgerMenu}>Wishlist</NavLink>
                                    )
                                }
                                {
                                    isAuthenticated ? (
                                        <>
                                            <NavLink to={`/profile/${user.sub}`} onClick={handleToggleBurgerMenu} className='w-full py-3 text-center'>My Profile</NavLink>
                                            <NavLink to={'/profile'} onClick={handleToggleBurgerMenu} className='w-full py-3 text-center'>Settings</NavLink>
                                            <button onClick={() => {handleToggleBurgerMenu(); handleLogout();}} className='w-full py-3 text-center'>Logout</button>
                                        </>
                                    ) : (
                                        <>
                                            <NavLink to={'/login'} onClick={handleToggleBurgerMenu} className='w-full py-3 text-center'>Login</NavLink>
                                            <NavLink to={'/register'} onClick={handleToggleBurgerMenu} className='w-full py-3 text-center'>Register</NavLink>
                                        </>
                                    )
                                }
                            </div>
                        </div>
                    </>
                )}
            </nav>
        </header>
    )
}