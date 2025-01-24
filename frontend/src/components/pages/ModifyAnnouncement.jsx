import React from 'react';
import { useParams } from 'react-router-dom';

export default function ModifyAnnouncement(){
    const { id } = useParams();



    return (
        <div>ModifyAnnouncement</div>
    )
}