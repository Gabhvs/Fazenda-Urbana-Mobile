import React from 'react';
import './Popup_Component.scss';

const Popup = ({ message, onClose, buttons }) => {
    return (
        <div className='popup_overlay'>
            <div className='popup'>
                <span>{message}</span>
                <div className="popup_buttons">
                    {buttons && buttons.length > 0 ? (
                        buttons.map((button, index) => (
                            <button 
                                key={index} 
                                onClick={button.onClick} 
                                className={button.className || 'popup_button'}
                            >
                                {button.label}
                            </button>
                        ))
                    ) : (
                        <>
                        <button onClick={onClose} className="popup_button">Fechar</button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Popup;
