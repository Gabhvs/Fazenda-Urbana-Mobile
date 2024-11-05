import React from 'react';
import './FormItem_Component.scss';


const FormItem = ({ label, type = 'text', name, value, onChange, placeholder, readOnly, required }) => {
    return (
        <div className="form_item">
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required ? true : false}
                readOnly={readOnly ? true : false}
            />
        </div>
    );
};

export default FormItem;
