import React from 'react';
import './Quem_Somos.scss';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'; // Ajuste o caminho conforme sua estrutura

const Quem_Somos = () => {
    const navigate = useNavigate();
    const { user } = useAuth(); // Obtém o usuário do contexto de autenticação

    const handleBackClick = () => {
        if (user) {
            navigate('/products'); // Redireciona para /products se o usuário estiver logado
        } else {
            navigate('/'); // Redireciona para / se o usuário não estiver logado
        }
    };

    return (
        <div className='about_container'>
            <span className='about_title'>Quem somos</span>
            <span className='about_text'>
                Numa fazenda urbana, pitayas de cores vibrantes pontuam o cenário, destacando-se entre arranha-céus. 
                Cultivadas com cuidado meticuloso, essas frutas exóticas são o orgulho do agricultor urbano. 
                Ele utiliza uma mistura equilibrada de adubos orgânicos e químicos de liberação lenta para garantir 
                o florescimento exuberante das pitayas. Essa pequena parcela verde na selva de concreto não só 
                fornece uma colheita abundante, mas também inspira a comunidade a reconectar-se com a terra e 
                a apreciar a beleza da agricultura urbana.
            </span>
            <span className='about_back' onClick={handleBackClick}>Voltar &#8592;</span>
        </div>
    );
}

export default Quem_Somos;
