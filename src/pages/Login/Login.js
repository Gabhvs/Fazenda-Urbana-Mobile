import React, { useState } from 'react';
import './Login.scss';
import Form from '../../components/Form/Form_Components';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api.core';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth(); // Pegando a função de login do contexto
    const [formData, setFormData] = useState({
        cpf: '',
        password: '',
    });
    const [error, setError] = useState(null); // Estado para gerenciar erros

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { cpf, password } = formData;
    
        const body = {
            nomeCliente: '',
            email: '',
            cpf: cpf,
            senha: password,
        };
    
        api
            .post('/Login', body)
            .then((response) => {
                login({
                    nome: response.data.dados.nomeCliente,
                    email: response.data.dados.email,
                    cpf: response.data.dados.cpf,
                    password: response.data.dados.senha,
                    id: response.data.dados.id,
                    // isAdmin: false, // Desabilitado, apenas para simular um usuário admin
                });
                navigate('/products');
            })
            .catch((err) => {
                setError('Usuário não encontrado ou senha incorreta. Verifique as informações e tente novamente.');
            });
            
    };

    const formItems = [
        { name: 'cpf', value: formData.cpf, onChange: handleChange, placeholder: 'CPF', required: true },
        { name: 'password', value: formData.password, onChange: handleChange, placeholder: 'SENHA', type: 'password', required: true },
    ];

    return (
        <div className="login_container">
            <Form title="Fazer Login" items={formItems} buttonText="Entrar" onSubmit={handleSubmit} />
            {error && <p className="error_message">{error}</p>} {/* Exibe mensagem de erro, se houver */}
            <span className='login_redirect' onClick={() => navigate('/signup')}>Cliente novo? Faça seu cadastro</span>
        </div>
    );
};

export default Login;
