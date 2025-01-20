import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { faUser, faClipboardList, faMagnifyingGlass, faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import logo from '../../assets/logo/logo.jpg';

export default function Header(){
    const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
    const [categories, setCategories] = useState([]);

    function handleToggleBurgerMenu(){
        setIsBurgerMenuOpen(!isBurgerMenuOpen)
    }

    function handleResize(){
        setIsMobile(window.innerWidth < 1024);
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

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    });

    useEffect(() => {
        fetchCategories();
    }, []);

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
                                        <span className="absolute -bottom-1 left-1/2 w-0 transition-all h-0.5 bg-primary group-hover:w-1/2"></span>
                                        <span className="absolute -bottom-1 right-1/2 w-0 transition-all h-0.5 bg-primary group-hover:w-1/2"></span>
                                    </NavLink>
                                ))
                            }
                            <NavLink to={`/categories`} className='hidden lg:inline mx-4 py-1 group relative'>
                                More
                                <span className="absolute -bottom-1 left-1/2 w-0 transition-all h-0.5 bg-primary group-hover:w-1/2"></span>
                                <span className="absolute -bottom-1 right-1/2 w-0 transition-all h-0.5 bg-primary group-hover:w-1/2"></span>
                            </NavLink>
                        </>
                    )}
                </div>
                {!isMobile && (
                    <>
                        <div className='hidden lg:block'>
                            <NavLink to={`/search`} className='group relative me-4 py-1'>
                                <FontAwesomeIcon icon={faMagnifyingGlass} size='lg' />
                                <span className="absolute -bottom-1 left-1/2 w-0 transition-all h-0.5 bg-primary group-hover:w-1/2"></span>
                                <span className="absolute -bottom-1 right-1/2 w-0 transition-all h-0.5 bg-primary group-hover:w-1/2"></span>
                            </NavLink>
                            <NavLink to={`/wishlist`} className='group relative mx-4 py-1'>
                                <FontAwesomeIcon icon={faClipboardList} size='lg'/>
                                <span className="absolute -bottom-1 left-1/2 w-0 transition-all h-0.5 bg-primary group-hover:w-1/2"></span>
                                <span className="absolute -bottom-1 right-1/2 w-0 transition-all h-0.5 bg-primary group-hover:w-1/2"></span>
                            </NavLink>
                            <NavLink to={`/login`} className='group relative ms-4 py-1'>
                                <FontAwesomeIcon icon={faUser} size='lg' />
                                <span className="absolute -bottom-1 left-1/2 w-0 transition-all h-0.5 bg-primary group-hover:w-1/2"></span>
                                <span className="absolute -bottom-1 right-1/2 w-0 transition-all h-0.5 bg-primary group-hover:w-1/2"></span>
                            </NavLink>
                        </div>
                    </>
                )}
                {!isBurgerMenuOpen && (
                    <div className='block bg-primary py-2 px-3 rounded-md lg:hidden' onClick={handleToggleBurgerMenu}>
                        <FontAwesomeIcon icon={faBars} size='2xl' />
                    </div>
                )}
                {isMobile && (
                    <>
                        <div className={`lg:hidden absolute top-0 right-0 h-screen w-80 py-5 z-50 bg-primary flex flex-col transition-transform duration-300 ${isBurgerMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
                            <FontAwesomeIcon icon={faXmark} size='2xl' className='mx-3 py-2 px-3 rounded-md bg-[#F4F6EE] self-end' onClick={handleToggleBurgerMenu} />
                            {
                                categories.slice(0, 4).map((category) => (
                                    <NavLink to={`/`} className='w-full py-3 text-center' key={category.id} onClick={handleToggleBurgerMenu}>
                                        {category.label}
                                    </NavLink>
                                ))
                            }
                            <NavLink to={`/categories`} className='w-full py-3 text-center' onClick={handleToggleBurgerMenu}>More</NavLink>
                            <div className='h-px w-11/12 bg-[#F4F6EE] mx-auto my-3'></div>
                            <div className='flex flex-col items-center'>
                                <NavLink to={`/search`} className='w-full py-3 text-center' onClick={handleToggleBurgerMenu}>
                                    <FontAwesomeIcon icon={faMagnifyingGlass} size='lg' className='me-3' />
                                    Search
                                </NavLink>
                                <NavLink to={`/wishlist`} className='w-full py-3 text-center' onClick={handleToggleBurgerMenu}>
                                    <FontAwesomeIcon icon={faClipboardList} size='lg' className='me-3' />
                                    Wishlist
                                </NavLink>
                                <NavLink to={`/login`} className='w-full py-3 text-center' onClick={handleToggleBurgerMenu}>
                                    <FontAwesomeIcon icon={faUser} size='lg' className='me-3' />
                                    Login
                                </NavLink>
                            </div>
                        </div>
                    </>
                )}
            </nav>
        </header>
    )
}