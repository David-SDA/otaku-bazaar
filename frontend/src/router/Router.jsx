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
import Announcement from '../components/pages/Announcement';
import MyProfile from '../components/pages/MyProfile';
import PublicUserProfile from '../components/pages/PublicUserProfile';
import CreateAnnouncement from '../components/pages/CreateAnnouncement';
import ModeratorPanel from '../components/pages/ModeratorPanel';
import AdminPanel from '../components/pages/AdminPanel';
import CreateCategory from '../components/pages/CreateCategory';
import NotAuthenticatedRoute from '../utils/NotAuthenticatedRoute';
import PrivateRoute from '../utils/PrivateRoute';
import ForgotPassword from '../components/pages/ForgotPassword';
import PasswordReset from '../components/pages/PasswordReset';

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
                element: <NotAuthenticatedRoute element={<Login />} />
            },
            {
                path: '/register',
                element: <NotAuthenticatedRoute element={<Register />} />
            },
            {
                path: '/forgot-password',
                element: <NotAuthenticatedRoute element={<ForgotPassword />} />
            },
            {
                path: '/reset-password',
                element: <NotAuthenticatedRoute element={<PasswordReset />} />
            },
            {
                path: '/wishlist',
                element: <PrivateRoute element={<Wishlist />} roles={['user', 'moderator', 'admin']} />
            },
            {
                path: '/categories',
                element: <Categories />
            },
            {
                path: '/categories/new',
                element: <PrivateRoute element={<CreateCategory />} roles={['admin']} />
            },
            {
                path: 'categories/:id/edit',
                element: <PrivateRoute element={<CreateCategory />} roles={['admin']} />
            },
            {
                path: '/announcements/:id',
                element: <Announcement />
            },
            {
                path: '/announcement/new',
                element: <PrivateRoute element={<CreateAnnouncement />} roles={['user', 'moderator', 'admin']} />
            },
            {
                path: '/profile',
                element: <PrivateRoute element={<MyProfile />} roles={['user', 'moderator', 'admin']} />
            },
            {
                path: '/profile/:id',
                element: <PublicUserProfile />
            },
            {
                path: '/moderator',
                element: <PrivateRoute element={<ModeratorPanel />} roles={['moderator']} />
            },
            {
                path: '/admin',
                element: <PrivateRoute element={<AdminPanel />} roles={['admin']} />
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