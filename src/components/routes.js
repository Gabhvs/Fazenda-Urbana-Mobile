import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Home from '../pages/Home/Home';
import Quem_Somos from '../pages/Quem_Somos/Quem_Somos';
import Login from '../pages/Login/Login';
import Signup from '../pages/Signup/Signup';
import Products from '../pages/Products/Products';
import Logout from '../pages/Logout/Logout';
import Cart from '../pages/Cart/Cart';
import Checkout from '../pages/Checkout/Checkout';
import Profile from '../pages/Profile/Profile';

// Componente para rotas protegidas
const ProtectedRoute = ({ element, isAdmin }) => {
    const { user } = useAuth();

    // Se o usuário não estiver logado, redireciona para a página de login
    if (!user) {
        return <Navigate to="/" replace />;
    }

    // Se a rota é para admin e o usuário não é admin, redireciona para home ou outra página
    if (isAdmin && !user.isAdmin) {
        return <Navigate to="/" replace />;
    }

    return element; // Retorna o elemento se o usuário estiver autenticado
};

// Rotas da aplicação
const routes = [
    {
        path: '/',
        Component: Home
    },
    {
        path: '/sobre',
        Component: Quem_Somos
    },
    {
        path: '/login',
        Component: Login
    },
    {
        path: '/signup',
        Component: Signup
    },
    {
        path: '/logout',
        Component: Logout
    },
    {
        path: '/profile',
        Component: Profile,
    },
    {
        path: '/products',
        Component: Products,
    },
    {
        path: '/cart',
        Component: Cart,
    },
    {
        path: '/checkout',
        Component: Checkout,
    },
    {
        path: '*',
        Component: Home,
    },
];

const DefaultRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                {routes.map(({ path, Component, isAdmin }) => (
                    <Route
                        path={path}
                        key={path}
                        element={
                            path === '/products' ? (
                                <ProtectedRoute element={<Component />} isAdmin={isAdmin} />
                            ) : (
                                <Component />
                            )
                        }
                    />
                ))}
            </Routes>
        </BrowserRouter>
    );
};

export default DefaultRoutes;
