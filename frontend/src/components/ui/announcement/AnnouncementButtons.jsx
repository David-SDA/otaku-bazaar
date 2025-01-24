import React, { forwardRef, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';

function AnnouncementButtons({isAuthenticated, announcement, isInWishlist, onToggleWishlist}, ref){
    const [isLoading, setLoading] = useState(false);
    const { user } = useAuth();

    async function handleWidhlistToggle(){
        if(!isAuthenticated) return;

        setLoading(true);
        try{
            const method = isInWishlist ? 'DELETE' : 'POST';
            const response = await fetch(`http://localhost:8000/users/wishes/${announcement.id}`, {method, credentials: 'include'});
            if(!response.ok){
                throw new Error('Failed to toggle wishlist');
            }

            onToggleWishlist(!isInWishlist);
        }
        catch(error){
            console.error('Error toggling wishlist:', error);
        }
        finally{
            setLoading(false);
        }
    }

    return (
        <div className='w-full flex flex-col sm:flex-row justify-around'>
            {
                isAuthenticated && (announcement.userId !== user.sub) && (
                    <button onClick={handleWidhlistToggle} disabled={isLoading} className={`bg-primary py-3 px-10 mb-5 sm:mb-0 font-bold rounded-xl hover:scale-105 transition-all duration-300 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                        {isLoading ? 'Loading...' : isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                    </button>
                )
            }
            <button onClick={() => ref.current.scrollIntoView({ behavior: 'smooth' })} className='bg-primary py-3 px-10 font-bold rounded-xl hover:scale-110 transition-all duration-300'>
                Contact the Seller
            </button>
        </div>
    )
}

export default forwardRef(AnnouncementButtons);