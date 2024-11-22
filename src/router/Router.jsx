import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Home from '../components/pages/Home';
import Search from '../components/pages/Search';
import Login from '../components/pages/Login';
import Register from '../components/pages/Register';
import Wishlist from '../components/pages/Wishlist';
import Categories from '../components/pages/Categories';
import Contact from '../components/pages/Contact';
import Terms from '../components/pages/legal/Terms';
import Privacy from '../components/pages/legal/Privacy';
import Security from '../components/pages/legal/Security';
import NotFound from '../components/pages/errors/NotFound';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <NotFound />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/search',
                element: <Search />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/register',
                element: <Register />
            },
            {
                path: '/wishlist',
                element: <Wishlist />
            },
            {
                path: '/categories',
                element: <Categories />
            },
            {
                path: '/contact',
                element: <Contact />
            },
            {
                path: '/terms',
                element: <Terms />
            },
            {
                path: '/privacy',
                element: <Privacy />
            },
            {
                path: '/security',
                element: <Security />
            },
        ]
    }
]);

export default router;