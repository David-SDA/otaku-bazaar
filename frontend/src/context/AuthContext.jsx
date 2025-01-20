import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext();

export function AuthProvider({children}) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading, setLoading] = useState(true);

    const checkAuthentication = useCallback(async () => {
        setLoading(true);
        try{
            const response = await fetch('http://localhost:8000/auth/me', { credentials: 'include' });
            if(response.ok){
                const userData = await response.json();
                setIsAuthenticated(true);
                setUser(userData);
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
    }, []);

    useEffect(() => {
        checkAuthentication();
    }, [checkAuthentication]);

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, isLoading, checkAuthentication }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
