import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Logout = () => {
    const { logout } = useAuth(); // Desestrutura o método de logout do contexto
    const navigate = useNavigate(); // Hook para redirecionamento

    useEffect(() => {
        const handleLogout = async () => {
            await logout(); // Chama o método de logout
            navigate('/'); // Redireciona para a tela inicial
        };

        handleLogout(); // Executa a função de logout ao montar o componente
    }, [logout, navigate]);

    return null; // Não renderiza nada
};

export default Logout;
