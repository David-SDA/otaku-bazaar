import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer(){
    return (
        <footer className='bg-primary'>
            <div className='container mx-auto px-4 py-5'>
                <ul className='flex flex-col sm:flex-row justify-center items-center'>
                    <li className='relative after:block after:w-5 after:h-px after:bg-neutral-800 after:mx-auto after:my-1 sm:after:content-["|"] sm:after:inline sm:after:bg-transparent sm:after:mx-2'>
                        <Link to={`/terms`}>Terms of Use</Link>
                    </li>
                    <li className='relative after:block after:w-5 after:h-px after:bg-neutral-800 after:mx-auto after:my-1 sm:after:content-["|"] sm:after:inline sm:after:bg-transparent sm:after:mx-2'>
                        <Link to={`/privacy`}>Privacy Policy</Link>
                    </li>
                    <li className='relative after:block after:w-5 after:h-px after:bg-neutral-800 after:mx-auto after:my-1 sm:after:content-["|"] sm:after:inline sm:after:bg-transparent sm:after:mx-2'>
                        <Link to={`/security`}>Security Policy</Link>
                    </li>
                    <li>
                        <Link to={`/contact`}>Contact Us</Link>
                    </li>
                </ul>
            </div>
        </footer>
    )
}
