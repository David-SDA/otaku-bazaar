import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext();

export function AuthProvider({children}){
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading, setLoading] = useState(true);

    const refreshAccessToken = useCallback(async () => {
        try {
            const response = await fetch('http://localhost:8000/auth/refresh', {
                method: 'POST',
                credentials: 'include',
            });
            if(!response.ok){
                throw new Error('Failed to refresh token');
            }

        }
        catch(error){
            console.error('Error refreshing access token:', error);
            setIsAuthenticated(false);
            setUser(null);
        }
    }, []);

    const checkAuthentication = useCallback(async () => {
        setLoading(true);
        try{
            const response = await fetch('http://localhost:8000/auth/me', { credentials: 'include' });
            if(response.ok){
                const userData = await response.json();
                setIsAuthenticated(true);
                setUser(userData);
            }
            else if(response.status === 401){
                const refreshed = await refreshAccessToken();
                if(refreshed){
                    const retryResponse = await fetch('http://localhost:8000/auth/me', { credentials: 'include' });
                    if(retryResponse.ok){
                        const retryUserData = await retryResponse.json();
                        setIsAuthenticated(true);
                        setUser(retryUserData);
                    }
                }
                setIsAuthenticated(false);
                setUser(null);
            }
            else{
                setIsAuthenticated(false);
                setUser(null);
            }
        }
        catch(error){
            console.error('Error checking authentication:', error);
            setIsAuthenticated(false);
            setUser(null);
        }
        finally{
            setLoading(false);
        }
    }, [refreshAccessToken]);

    const logout = useCallback(async () => {
        setLoading(true);
        try{
            const response = await fetch('http://localhost:8000/auth/logout', {
                method: 'POST',
                credentials: 'include'
            });
            if(!response.ok){
                throw new Error('Error logging out');
            }

            setIsAuthenticated(false);
            setUser(null);
        }
        catch(error){
            console.error('Error logging out:', error);
        }
        finally{
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        checkAuthentication();
    }, [checkAuthentication]);

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, isLoading, checkAuthentication, refreshAccessToken, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(){
    return useContext(AuthContext);
}
