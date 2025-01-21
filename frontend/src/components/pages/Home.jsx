import React from 'react';
import AnnouncementsLine from '../ui/announcements/AnnouncementsLine';
import AnnouncementsLineHeader from '../ui/announcements/AnnouncementsLineHeader';
import { Link } from 'react-router-dom';

export default function Home(){
    return (
        <>
            <Link to={'/announcement/new'} className='block w-fit bg-primary font-bold ms-auto px-6 py-2 rounded-lg mt-2 hover:scale-105 transition-all duration-300'>Create an announcement</Link>
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
