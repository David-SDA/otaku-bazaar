import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { faUser, faClipboardList, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

export default function Header() {
    const [categories, setCategories] = useState([]);

    function fetchCategoriesData(){
        fetch('http://localhost:5000/categories')
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                setCategories(data)
            })
            .catch((error) => {
                console.log('Error: ', error)
            });
    }

    useEffect(() => {
        fetchCategoriesData()
    }, [])

    return (
        <header className='h-24 py-2 border-b border-[#F6BD60] text-neutral-800 font-bold flex items-center'>
            <nav className='container mx-auto flex justify-between items-center'>
                <div>
                    <NavLink to={`/`} className='bg-orange-500 py-5 px-20 me-7'>Logo</NavLink>
                    {
                        categories.slice(0, 4).map((category) => (
                            <NavLink to={`/`} className='me-4' key={category.id}>{category.label}</NavLink>
                        ))
                    }
                    <NavLink to={`/search`} className='ms-4'>More</NavLink>
                </div>
                <div>
                    <NavLink to={`/search`}><FontAwesomeIcon icon={faMagnifyingGlass} size='lg' className='me-4' /></NavLink>
                    <NavLink to={`/wishlist`}><FontAwesomeIcon icon={faClipboardList} size='lg' className='mx-4' /></NavLink>
                    <NavLink to={`/login`}><FontAwesomeIcon icon={faUser} size='lg' className='ms-4' /></NavLink>
                </div>
            </nav>
        </header>
    )
}