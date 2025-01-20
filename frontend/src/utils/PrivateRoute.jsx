import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingAnimation from '../components/ui/general/LoadingAnimation';

export default function PrivateRoute({element, roles}){
    const { isAuthenticated, user, isLoading } = useAuth();

    if(isLoading){
        return <LoadingAnimation />
    }

    if(!isAuthenticated){
        return <Navigate to="/login" replace />;
    }

    if(roles && !roles.includes(user?.role)){
        return <Navigate to="/" replace />;
    }

    return element;
}