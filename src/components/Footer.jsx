import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Footer(){
    return (
        <footer className='bg-[#F6BD60]'>
            <div className='container mx-auto px-4 py-5'>
                <ul className='flex flex-col sm:flex-row justify-center items-center'>
                    <li className='relative after:block after:w-5 after:h-px after:bg-neutral-800 after:mx-auto after:my-1 sm:after:content-["|"] sm:after:inline sm:after:bg-transparent sm:after:mx-2'>
                        All rights reserved
                    </li>
                    <li className='relative after:block after:w-5 after:h-px after:bg-neutral-800 after:mx-auto after:my-1 sm:after:content-["|"] sm:after:inline sm:after:bg-transparent sm:after:mx-2'>
                        <NavLink to={`/terms`}>Terms of Use</NavLink>
                    </li>
                    <li className='relative after:block after:w-5 after:h-px after:bg-neutral-800 after:mx-auto after:my-1 sm:after:content-["|"] sm:after:inline sm:after:bg-transparent sm:after:mx-2'>
                        <NavLink to={`/privacy`}>Privacy Policy</NavLink>
                    </li>
                    <li>
                        <NavLink to={`/security`}>Security Policy</NavLink>
                    </li>
                </ul>
            </div>
        </footer>
    )
}
