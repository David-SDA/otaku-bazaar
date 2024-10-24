import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { faUser, faClipboardList } from '@fortawesome/free-solid-svg-icons'

export default function Header() {
    return (
        <header className='h-24 py-2 border-b border-[#F6BD60] text-neutral-800 font-bold flex items-center'>
            <nav className='container mx-auto flex justify-between items-center'>
                <div>
                    <NavLink to={`/`} className='bg-orange-500 py-5 px-20 me-7'>Logo</NavLink>
                    <NavLink to={`/`} className='me-4'>Categorie</NavLink>
                    <NavLink to={`/`} className='mx-4'>Categorie</NavLink>
                    <NavLink to={`/`} className='mx-4'>Categorie</NavLink>
                    <NavLink to={`/`} className='mx-4'>Categorie</NavLink>
                    <NavLink to={`/`} className='ms-4'>Categorie</NavLink>
                </div>
                <div>
                    <NavLink to={`/wishlist`}><FontAwesomeIcon icon={faClipboardList} className='me-4' /></NavLink>
                    <NavLink to={`/login`}><FontAwesomeIcon icon={faUser} className='ms-4' /></NavLink>
                </div>
            </nav>
        </header>
    )
}