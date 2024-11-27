import React from 'react';
import AnnounceLine from '../ui/AnnounceLine';
import AnnounceLineHeader from '../ui/AnnounceLineHeader';

export default function Home(){
    return (
        <>
            <AnnounceLineHeader
                title={'What\'s new'}
                link={'/'}
            />
            <AnnounceLine />
            <AnnounceLineHeader
                title={'Figurines'}
                link={'/'}
            />
            <AnnounceLine />
            <AnnounceLineHeader
                title={'Posters'}
                link={'/'}
            />
            <AnnounceLine />
            <AnnounceLineHeader
                title={'Clothes'}
                link={'/'}
            />
            <AnnounceLine />
        </>
    )
}
