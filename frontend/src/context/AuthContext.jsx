import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        async function checkAuthentication() {
            const response = await fetch('http://localhost:8000/auth/me', { credentials: 'include' });
            if(response.ok){
                setIsAuthenticated(true);
            }
            else{
                setIsAuthenticated(false);
            }
        }
        checkAuthentication();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
