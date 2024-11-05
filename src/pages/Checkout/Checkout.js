import React, { useState, useEffect } from 'react';
import './Checkout.scss';
import { useNavigate } from 'react-router-dom';


const Checkout = () => {
    const history = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000); // Tempo em ms de "loading"

        return () => clearTimeout(timer); // Limpa o timeout ao desmontar
    }, []);

    return (
        <div className="checkout_container">
            {loading ? (
                <div className="loading_spinner"></div>
            ) : (
                <div className='end_container'>
                    <span className="checkout_text">
                        Compra finalizada com sucesso!
                    </span>
                    <span className='button_back' onClick={() => history('/products')}>
                        Voltar para a loja
                    </span>
                </div>
            )}
        </div>
    );
}

export default Checkout