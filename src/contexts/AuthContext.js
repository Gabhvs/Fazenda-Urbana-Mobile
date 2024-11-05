import React, { createContext, useContext, useEffect, useState } from 'react';

// Criando o contexto
const AuthContext = createContext();

// Provedor de autenticação
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Efeito para recuperar o usuário logado do localStorage
    useEffect(() => {
        const loggedUser = localStorage.getItem('loggedUser');
        if (loggedUser) {
            setUser(JSON.parse(loggedUser));
        }

        if (!user) {
            localStorage.removeItem('loggedUser');
        }
    }, []);

    // Função de login
    const login = (user) => {
        setUser(user);
        localStorage.setItem('loggedUser', JSON.stringify(user)); // Armazena o usuário logado
    };

    // Função de logout
    const logout = () => {
        setUser(null);
        localStorage.removeItem('loggedUser');
    };

    return (
        <AuthContext.Provider value={{ user, setUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook para usar o contexto
export const useAuth = () => {
    return useContext(AuthContext);
};
