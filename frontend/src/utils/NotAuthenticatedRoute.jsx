import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingAnimation from '../components/ui/general/LoadingAnimation';

export default function NotAuthenticatedRoute({element}){
    const { isAuthenticated, isLoading } = useAuth();

    if(isLoading){
        return <LoadingAnimation />;
    }
    if(isAuthenticated){
        return <Navigate to="/" replace />;
    }

    return element;
}