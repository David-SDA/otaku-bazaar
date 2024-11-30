import React from 'react';
import AnnouncesLine from '../ui/AnnouncesLine';
import AnnouncesLineHeader from '../ui/AnnouncesLineHeader';

export default function Home(){
    return (
        <>
            <AnnouncesLineHeader
                title={'What\'s new'}
                link={'/'}
            />
            <AnnouncesLine />
            <AnnouncesLineHeader
                title={'Figurines'}
                link={'/'}
            />
            <AnnouncesLine />
            <AnnouncesLineHeader
                title={'Posters'}
                link={'/'}
            />
            <AnnouncesLine />
            <AnnouncesLineHeader
                title={'Clothes'}
                link={'/'}
            />
            <AnnouncesLine />
        </>
    )
}
