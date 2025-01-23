import React, { useEffect, useState } from 'react';
import AnnouncementsReportedTable from '../ui/announcements/AnnouncementsReportedTable';
import UsersReportedTable from '../ui/users/UsersReportedTable';
import UsersTable from '../ui/users/UsersTable';
import CategoriesTable from '../ui/category/CategoriesTable';
import LoadingAnimation from '../ui/general/LoadingAnimation';

export default function AdminPanel(){
    const [reportedAnnouncements, setReportedAnnouncements] = useState([]);
    const [reportedUsers, setReportedUsers] = useState([]);
    const [users, setUsers] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchAdminPanel(){
            try{
                const reportedAnnouncementsResponse = await fetch('http://localhost:8000/announcements/reported', {credentials: 'include'});
                if(!reportedAnnouncementsResponse.ok){
                    throw new Error('Failed to fetch reported announcements');
                }
                const reportedAnnouncementsData = await reportedAnnouncementsResponse.json();
                setReportedAnnouncements(reportedAnnouncementsData);

                const reportedUsersResponse = await fetch('http://localhost:8000/users/reported', {credentials: 'include'});
                if(!reportedUsersResponse.ok){
                    throw new Error('Failed to fetch reported users');
                }
                const reportedUsersData = await reportedUsersResponse.json();
                setReportedUsers(reportedUsersData);

                const usersResponse = await fetch('http://localhost:8000/users?page=1&limit=100', {credentials: 'include'});
                if(!usersResponse.ok){
                    throw new Error('Failed to fetch users');
                }
                const usersData = await usersResponse.json();
                setUsers(usersData.data);

                const categoriesResponse = await fetch('http://localhost:8000/categories', {credentials: 'include'});
                if(!categoriesResponse.ok){
                    throw new Error('Failed to fetch categories');
                }
                const categoriesData = await categoriesResponse.json();
                setCategories(categoriesData);
            }
            catch(error){
                console.error('Error fetching admin panel:', error);
            }
            finally{
                setLoading(false);
            }
        }

        fetchAdminPanel();
    }, []);

    return (
        <>
            {
                isLoading ? (
                    <LoadingAnimation />
                ) : (
                    <>
                        <h1 className='text-center text-xl lg:text-2xl font-bold mb-5'>Admin Panel</h1>
                        <h2 className='text-xl font-bold mb-3'>Reported Announcements</h2>
                        <AnnouncementsReportedTable reportedAnnouncements={reportedAnnouncements} />
                        <h2 className='text-xl font-bold mb-3'>Reported Users</h2>
                        <UsersReportedTable reportedUsers={reportedUsers} />
                        <h2 className='text-xl font-bold mb-3'>Categories</h2>
                        <CategoriesTable categories={categories} />
                        <h2 className='text-xl font-bold mb-3'>Users</h2>
                        <UsersTable users={users} />
                    </>
                )
            }
        </>
    )
}