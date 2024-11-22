import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

export default function Layout(){
    return (
        <div className='bg-[#f4f6ee] text-neutral-800 flex flex-col min-h-screen'>
            <Header />
            <main className='container mx-auto my-5 px-4 flex-grow'>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}