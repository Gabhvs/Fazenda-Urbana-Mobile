import React, { useState, useEffect } from 'react';
import './Profile.scss';
import BurgerMenu from '../../components/BurguerMenu/BurgerMenu_Component';
import Form from '../../components/Form/Form_Components';
import Popup from '../../components/Popup_Component/Popup_Component';
import api from '../../services/api.core';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const history = useNavigate();
    const [popupMessage, setPopupMessage] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [popupButtons, setPopupButtons] = useState([]);
    const [formData, setFormData] = useState({
        nomeCliente: '',
        cpf: '',
        email: '',
        senha: '',
        confirmPassword: '',
    });

    // Recupera o usuário do localStorage
    const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));

    const loadUserFromLocalStorage = () => {
        const storedUser = JSON.parse(localStorage.getItem('loggedUser'));
        if (storedUser) {
            setFormData({
                nomeCliente: storedUser.nome,
                cpf: storedUser.cpf,
                email: storedUser.email,
                senha: '',
                confirmPassword: '',
            });
        }
    };

    useEffect(() => {
        loadUserFromLocalStorage();

        const handleStorageChange = () => {
            loadUserFromLocalStorage();
        };

        window.addEventListener('storage', handleStorageChange);

        // Limpeza do event listener ao desmontar o componente
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { nomeCliente, email, senha, confirmPassword } = formData;

        // Verifica se as senhas coincidem
        if (senha !== confirmPassword && senha !== '') {
            setPopupMessage('As senhas não coincidem.');
            setShowPopup(true);
            return;
        }

        // Verifica se loggedUser está definido
        if (!loggedUser) {
            setPopupMessage('Erro: Usuário não está logado.');
            setShowPopup(true);
            return;
        }

        // Se o usuário não quiser alterar a senha, usamos a senha atual
        const updatedUser = {
            id: loggedUser.id, // Aqui deve estar acessível
            nomeCliente,
            cpf: loggedUser.cpf, // CPF não deve mudar
            email,
            senha: senha || loggedUser.password, // Se senha estiver vazia, mantenha a existente
        };

        try {
            api.put('/Cliente/EditarCliente', updatedUser)
                .then((response) => {
                    if (response.status === 200) {
                        const newUser = response.data.dados;

                        // Formatação do usuário para o localStorage
                        const loggedUserUpdated = {
                            nome: newUser.nomeCliente,
                            cpf: newUser.cpf,
                            password: senha || newUser.senha,
                            email,
                            id: loggedUser.id,
                        }

                        localStorage.setItem('loggedUser', JSON.stringify(loggedUserUpdated));
                        setPopupMessage('Perfil atualizado com sucesso!');
                    } else {
                        throw new Error('Erro ao atualizar perfil.');
                    }
                })
                .catch((error) => {
                    console.error('Erro:', error);
                    setPopupMessage('Erro ao atualizar perfil. Tente novamente.');
                });

        } catch (error) {
            console.error('Erro:', error);
            setPopupMessage('Erro ao atualizar perfil. Tente novamente.');
        } finally {
            setShowPopup(true);
        }
    };

    const showPopupMessage = (message, buttons = null) => {
        setPopupMessage(message);
        setPopupButtons(buttons);
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
        setPopupButtons([]);
    };

    const handleConfirmDelete = () => {
        closePopup();

        api.delete(`/Cliente/DeletarCliente?cpf=${loggedUser.cpf}`)
            .then((response) => {
                if (response.status === 200) {
                    localStorage.removeItem('loggedUser');
                    history('/');                    
                } else {
                    throw new Error('Erro ao excluir usuário.');
                }
            })
            .catch((error) => {
                console.error('Erro:', error);
                setPopupMessage('Erro ao excluir usuário. Tente novamente.');
                setShowPopup(true);
            });
    };

    const formItems = [
        { name: 'nomeCliente', value: formData.nomeCliente, onChange: handleChange, placeholder: 'NOME' },
        { name: 'cpf', value: formData.cpf, placeholder: 'CPF', readOnly: true },
        { name: 'email', value: formData.email, onChange: handleChange, placeholder: 'E-MAIL' },
        { name: 'senha', value: formData.senha, onChange: handleChange, placeholder: 'SENHA', type: 'password' },
        { name: 'confirmPassword', value: formData.confirmPassword, onChange: handleChange, placeholder: 'CONFIRMAR SENHA', type: 'password' },
    ];

    return (
        <div className='profile_container'>
            <BurgerMenu />
            <div className='profile_card'>
                <Form title='Perfil' items={formItems} buttonText="Atualizar" onSubmit={handleSubmit} />
                <span 
                    className="delete_button" 
                    onClick={() => 
                        showPopupMessage("Tem certeza que deseja deletar o usuário?", [
                            { label: "Voltar", onClick: closePopup },
                            { label: "Confirmar", onClick: handleConfirmDelete }
                        ])
                    }
                >
                    Deletar Usuário
                </span>
            </div>
            {showPopup && (
                <Popup 
                    message={popupMessage} 
                    onClose={closePopup} 
                    buttons={popupButtons} 
                />
            )}
        </div>
    );
}

export default Profile;
