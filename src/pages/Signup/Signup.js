import React, { useState } from 'react';
import './Signup.scss';
import Form from '../../components/Form/Form_Components';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api.core';

const Signup = () => {
    const history = useNavigate();
    const { setUser } = useAuth();
    const [formData, setFormData] = useState({
        nome: '',
        cpf: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'cpf') {
            const cleanedValue = value.replace(/[^\d]/g, ''); 
            setFormData((prevData) => ({ ...prevData, [name]: cleanedValue }));
        } else {
            setFormData((prevData) => ({ ...prevData, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { nome, cpf, email, password } = formData;

        try {
            const response = await api.post('/Cliente/CriarCliente', {
                nomeCliente: nome,
                cpf: cpf,
                email: email,
                senha: password
            });

            if (response.status === 200) {
                const newUser = response.data.dados;
                const index = newUser.length - 1


                const user = {
                    nome: newUser[index].nomeCliente,
                    cpf: newUser[index].cpf,
                    email: newUser[index].email,
                    password: newUser[index].senha,
                    id: newUser[index].id,
                };

                setUser(user);
                localStorage.setItem('loggedUser', JSON.stringify(user));
                history('/products');
            }
        } catch (error) {
            if (!error.response.status === 200) {
                alert('CPF já cadastrado.');
            } else {
                console.error("Erro ao cadastrar o usuário:", error);
                alert('Erro no cadastro. Tente novamente.');
            }
        }
    };

    const formItems = [
        { name: 'nome', value: formData.nome, onChange: handleChange, placeholder: 'NOME', required: true },
        { name: 'cpf', value: formData.cpf, onChange: handleChange, placeholder: 'CPF', required: true },
        { name: 'email', value: formData.email, onChange: handleChange, placeholder: 'E-MAIL', required: true },
        { name: 'password', value: formData.password, onChange: handleChange, placeholder: 'SENHA', type: 'password', required: true },
    ];

    return (
        <div className="signup_container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Form title="Cadastre-se abaixo" items={formItems} buttonText="Cadastrar" onSubmit={handleSubmit} />
            <span className='login_redirect' onClick={() => history('/login')}>Fazer Login</span>
        </div>
    );
};

export default Signup;
