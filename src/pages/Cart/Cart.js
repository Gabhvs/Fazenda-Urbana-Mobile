import React, { useState, useEffect } from 'react';
import './Cart.scss';
import pitaya_branca from '../../assets/pitaya_branca.jpg';
import pitaya_vermelha from '../../assets/pitaya_vermelha.jpg';
import pitaya_amarela from '../../assets/pitaya_amarela.jpg';
import { useNavigate } from 'react-router-dom';
import BurgerMenu from '../../components/BurguerMenu/BurgerMenu_Component';

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

const Cart = () => {
    const history = useNavigate();
    const [cart, setCart] = useState({});
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('loggedUser'));
        if (user) {
            const allCarts = JSON.parse(localStorage.getItem('carts')) || {};
            const userCart = allCarts[user.cpf] || {};  // Carrega o carrinho do usuário atual
            setCart(userCart);
        }
    }, []);

    useEffect(() => {
        const itemsInCart = Object.keys(cart).map((productId) => {
            const product = products.find((p) => p.id === parseInt(productId));
            return { ...product, quantity: cart[productId] };
        });
        setCartItems(itemsInCart);
    }, [cart]);

    const formatToBRL = (value) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(value);
    };

    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity < 1) return;

        const updatedCart = { ...cart, [productId]: newQuantity };
        setCart(updatedCart);

        const user = JSON.parse(localStorage.getItem('loggedUser'));
        if (user) {
            const allCarts = JSON.parse(localStorage.getItem('carts')) || {};
            allCarts[user.cpf] = updatedCart;  // Atualiza o carrinho específico do usuário
            localStorage.setItem('carts', JSON.stringify(allCarts));
        }
    };

    const removeFromCart = (productId) => {
        const { [productId]: _, ...rest } = cart;
        setCart(rest);

        const user = JSON.parse(localStorage.getItem('loggedUser'));
        if (user) {
            const allCarts = JSON.parse(localStorage.getItem('carts')) || {};
            allCarts[user.cpf] = rest;  // Atualiza o carrinho específico do usuário após remover o produto
            localStorage.setItem('carts', JSON.stringify(allCarts));
        }
    };

    const handleCheckout = () => {
        history('/checkout');

        const user = JSON.parse(localStorage.getItem('loggedUser'));
        if (user) {
            const allCarts = JSON.parse(localStorage.getItem('carts')) || {};
            allCarts[user.cpf] = {};  // Limpa o carrinho do usuário atual após checkout
            localStorage.setItem('carts', JSON.stringify(allCarts));
            setCart({});
        }
    };

    return (
        <div className='cart_container'>
            <BurgerMenu />
            <span className='cart_title'>Meu carrinho</span>
            <div className='cart_items'>
                <span className='cart_header'>Finalize sua compra:</span>
                {cartItems.length === 0 ? (
                    <div className='cart_empty'>
                        <span className='empty_text'>Seu carrinho está vazio!</span>
                    </div>
                ) : (
                    <div className='cart_list'>
                        {cartItems.map((item) => (
                            <div className='card_product' key={item.id}>
                                <img className='product_img' src={item.image} alt={item.name} />
                                <div className='product_info'>
                                    <span className='product_name'>{item.name} - {formatToBRL(item.price)}/Kg</span>
                                    <span className='product_quantity'>
                                        <button className='quantity_button' onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                                        <input
                                            type='number'
                                            value={item.quantity}
                                            min="1"
                                            className='quantity_input'
                                            readOnly
                                        />
                                        <button className='quantity_button' onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                        <button className='remove_button' onClick={() => removeFromCart(item.id)}>
                                            Remover
                                        </button>
                                    </span>
                                </div>
                            </div>
                        ))}
                        <span className='checkout_total'>
                            Total: {formatToBRL(cartItems.reduce((total, item) => total + (item.price * item.quantity), 0))}
                        </span>
                        <div className='checkout_method'>
                            <label htmlFor="paymentMethod">Forma de pagamento:</label>
                            <select
                                className='payment_method'
                                id="paymentMethod"
                            >
                                <option value="">Selecione...</option>
                                <option value="creditCard">Cartão de crédito</option>
                                <option value="debitCard">Cartão de débito</option>
                                <option value="pix">Pix</option>
                                <option value="boleto">Boleto</option>
                            </select>
                        </div>
                    </div>
                )}
            </div>
            <div className='cart_buttons'>
                <span className='button' onClick={() => history('/products')}>Voltar</span>
                <span
                    className='button button_finish'
                    style={{ visibility: cartItems.length ? 'visible' : 'hidden' }}
                    onClick={handleCheckout}
                >
                    Finalizar
                </span>
            </div>
        </div>
    );
};

export default Cart;
