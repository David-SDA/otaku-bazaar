import React from 'react';
import AnnouncementsLine from '../ui/announcements/AnnouncementsLine';
import AnnouncementsLineHeader from '../ui/announcements/AnnouncementsLineHeader';

export default function Home(){
    return (
        <>
            <AnnouncementsLineHeader
                title={'What\'s new'}
                link={'/'}
            />
            <AnnouncementsLine />
            <AnnouncementsLineHeader
                title={'Figurines'}
                link={'/'}
            />
            <AnnouncementsLine />
            <AnnouncementsLineHeader
                title={'Posters'}
                link={'/'}
            />
            <AnnouncementsLine />
            <AnnouncementsLineHeader
                title={'Clothes'}
                link={'/'}
            />
            <AnnouncementsLine />
        </>
    )
}
