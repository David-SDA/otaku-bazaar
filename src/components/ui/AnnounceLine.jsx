import React, { useRef } from 'react'
import AnnounceCard from './AnnounceCard'

export default function AnnounceLine(){
    const containerRef = useRef(null); // Ref pour accéder au conteneur div
    const isClickDownRef = useRef(false); // Ref pour savoir si la souris est cliqué
    const mouseDownStartXRef = useRef(0); // Ref pour la position X de la souris au moment où on clique
    const scrollLeftContainerRef = useRef(0); // Ref pour la position de défilement X du conteneur div au moment où on clique

    function handleMouseDown(e){
        isClickDownRef.current = true;
        containerRef.current.classList.add('cursor-grabbing');
        mouseDownStartXRef.current = e.pageX - containerRef.current.offsetLeft; // Position X de la souris relative au conteneur
        scrollLeftContainerRef.current = containerRef.current.scrollLeft; // Position X de défilement actuelle du conteneur
    };

    function handleMouseUp(){
        isClickDownRef.current = false;
        containerRef.current.classList.remove('cursor-grabbing');
    };

    function handleMouseMove(e){
        if(!isClickDownRef.current){
            return;
        }
        else{
            const x = e.pageX - containerRef.current.offsetLeft; // Position de la souris relative au conteneur
            const walk = (x - mouseDownStartXRef.current) * 2; // Distance parcourue par la souris avec multiplié par 2
            containerRef.current.scrollLeft = scrollLeftContainerRef.current - walk; // Mise à jour du défilement X du conteneur
        }
    };

    return (
        <div 
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseUp}
            className='flex pb-3 overflow-x-scroll cursor-grab select-none [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300'
        >
            {
                Array.from({length: 9}).map((_, index) => (
                    <AnnounceCard key={index} />
                ))
            }
        </div>
    )
}
