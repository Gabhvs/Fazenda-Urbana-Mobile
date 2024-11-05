import React, { useState } from 'react';
import './BurgerMenu_Component.scss';
import logo from '../../assets/logo.png'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const BurgerMenu = () => {
    const history = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    
    const user = useAuth().user;
    const nomeFormated = user.nome ? user.nome.includes(' ') ? user.nome.split(' ')[0] : user.nome : '';
    
    return (
        <div className="burger-menu">
            {/* Ícone do menu burger */}
            <div className={`burger-icon ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
            </div>

            {/* Menu lateral */}
            <div className={`side-menu ${isOpen ? 'open' : ''}`}>
                <img src={logo} alt="Logo" className="logo" />
                <span className='logo-text'>Fazenda Urbana</span>
                <span className='welcome_text'>Bem-vindo, {nomeFormated}</span>
                <nav>
                    <ul>
                        <li onClick={()=> history('/sobre')}>Quem Somos</li>
                        <li onClick={()=> history('/products')}>Produtos</li>
                        <li onClick={()=> history('/cart')}>Carrinho</li>
                        <li onClick={()=> history('/profile')}>Perfil</li>
                        <li onClick={()=> history('/logout')}>Sair</li>
                    </ul>
                </nav>
            </div>

            {/* Overlay para fechar o menu ao clicar fora */}
            {isOpen && <div className="overlay" onClick={toggleMenu}></div>}
        </div>
    );
};

export default BurgerMenu;
