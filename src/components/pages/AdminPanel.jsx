import React from 'react';
import AnnouncementsReportedTable from '../ui/announcements/AnnouncementsReportedTable';
import UsersReportedTable from '../ui/users/UsersReportedTable';
import UsersTable from '../ui/users/UsersTable';

export default function AdminPanel(){
    return (
        <>
            <h1 className='text-center text-xl lg:text-2xl font-bold mb-5'>Moderator Panel</h1>
            <h2 className='text-xl font-bold mb-3'>Reported Announcements</h2>
            <AnnouncementsReportedTable />
            <h2 className='text-xl font-bold mb-3'>Reported Users</h2>
            <UsersReportedTable />
            <h2 className='text-xl font-bold mb-3'>Users</h2>
            <UsersTable />
        </>
    )
}