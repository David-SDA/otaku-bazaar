import React from 'react';
import AnnouncementsLine from '../ui/announcements/AnnouncementsLine';
import AnnouncementsLineHeader from '../ui/announcements/AnnouncementsLineHeader';

export default function Home(){
    return (
        <>
            <AnnouncementsLineHeader
                title={'What\'s new'}
                link={'/search'}
            />
            <AnnouncementsLine categoryId={null} />
            <AnnouncementsLineHeader
                title={'Figurines'}
                link={'/search'}
            />
            <AnnouncementsLine categoryId={3} />
            <AnnouncementsLineHeader
                title={'Posters'}
                link={'/search'}
            />
            <AnnouncementsLine categoryId={5} />
            <AnnouncementsLineHeader
                title={'Clothes'}
                link={'/search'}
            />
            <AnnouncementsLine categoryId={8} />
        </>
    )
}
