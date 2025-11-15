import {createContext, useContext, useEffect, useState} from 'react';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    useEffect(() => {
        const savedState = localStorage.getItem('isLoggedIn') === 'true';
        setIsLoggedIn(savedState);
    }, []);

    const login = () => {
        localStorage.setItem('isLoggedIn', 'true');
        setIsLoggedIn(true);
    };

    const logout = () => {
        localStorage.removeItem('isLoggedIn');
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
