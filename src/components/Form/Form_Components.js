import React from 'react';
import FormItem from '../FormItem/FomItem_Component';
import './Form_Component.scss';

const Form = ({ title, items, buttonText, onSubmit }) => {
    return (
        <form className='form_container' onSubmit={onSubmit}>
            {title && <h2>{title}</h2>}
            {items.map((item, index) => (
                <FormItem key={index} {...item} />
            ))}
            <button className='form_submit' type="submit">{buttonText}</button>
        </form>
    );
};

export default Form;
