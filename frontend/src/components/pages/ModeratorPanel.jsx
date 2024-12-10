import React from 'react';
import AnnouncementsReportedTable from '../ui/announcements/AnnouncementsReportedTable';

export default function ModeratorPanel(){
    return (
        <>
            <h1 className='text-center text-xl lg:text-2xl font-bold mb-5'>Moderator Panel</h1>
            <h2 className='text-xl font-bold mb-3'>Reported Announcements</h2>
            <AnnouncementsReportedTable />
        </>
    );
}