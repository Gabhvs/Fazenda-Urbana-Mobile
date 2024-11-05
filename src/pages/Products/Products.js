import React, { useState, useEffect } from 'react';
import './Products.scss';
import pitaya_branca from '../../assets/pitaya_branca.jpg';
import pitaya_vermelha from '../../assets/pitaya_vermelha.jpg';
import pitaya_amarela from '../../assets/pitaya_amarela.jpg';
import BurgerMenu from '../../components/BurguerMenu/BurgerMenu_Component';
import cart from '../../assets/cart.png';
import Popup from '../../components/Popup_Component/Popup_Component';
import { useNavigate } from 'react-router-dom';

const products = [
    {
        id: 1,
        name: 'Pitaya Branca',
        image: pitaya_branca,
        price: 15
    },
    {
        id: 2,
        name: 'Pitaya Vermelha',
        image: pitaya_vermelha,
        price: 12
    },
    {
        id: 3,
        name: 'Pitaya Amarela',
        image: pitaya_amarela,
        price: 10
    }
];

const Products = () => {
    const [loggedUser, setLoggedUser] = useState(null);
    const [hasItems, setHasItems] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [showPopup, setShowPopup] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('loggedUser'));
        if (user) {
            setLoggedUser(user);

            // Recupera o carrinho associado ao CPF do usuário
            const allCarts = JSON.parse(localStorage.getItem('carts')) || {};
            const userCart = allCarts[user.cpf] || {};
            setHasItems(Object.keys(userCart).length > 0);
        }
    }, []);

    const handleAddToCart = (productId) => {
        if (loggedUser) {
            // Recupera o estado atual de todos os carrinhos
            const allCarts = JSON.parse(localStorage.getItem('carts')) || {};
            const userCart = allCarts[loggedUser.cpf] || {};

            // Se o produto já estiver no carrinho, mostra um popup
            if (userCart[productId]) {
                setPopupMessage('Este produto já foi adicionado ao carrinho!');
                setShowPopup(true);
                return;
            }

            // Adiciona o novo produto ao carrinho com quantidade padrão 1
            userCart[productId] = 1;
            setPopupMessage('Produto adicionado ao carrinho!');
            setShowPopup(true);

            // Atualiza o carrinho do usuário específico no conjunto de carrinhos
            allCarts[loggedUser.cpf] = userCart;
            localStorage.setItem('carts', JSON.stringify(allCarts));

            // Atualiza o estado de itens no carrinho
            setHasItems(Object.keys(userCart).length > 0);
        }
    };

    const formatToBRL = (value) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(value);
    };

    return (
        <div className='products_container'>
            <BurgerMenu />
            <img
                onClick={() => navigate('/cart')} // Redireciona para a página de carrinho
                src={cart}
                alt='Carrinho de compras'
                className={`cart_icon ${hasItems ? 'has-items' : ''}`} // Adiciona a classe has-items se houver itens
            />
            <p className='products_title'>Descubra a qualidade das pitayas da nossa fazenda urbana, cultivadas com cuidado!</p>
            <div className='products_grid'>
                {products.map((product) => (
                    <div key={product.id} className='product_item'>
                        <span className='product_name'>{product.name}</span>
                        <img className='product_image' src={product.image} alt={product.name} />
                        <div className='quantity_container'>
                            <span className='product_price'>{formatToBRL(product.price)} /Kg</span>
                            <button className='quantity_add' onClick={() => handleAddToCart(product.id)}>+</button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Renderiza o Popup se o showPopup estiver true */}
            {showPopup && <Popup message={popupMessage} onClose={() => setShowPopup(false)} />}
        </div>
    );
};

export default Products;
