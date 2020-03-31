import React from 'react';
import './Button.css';
const Button = ({journey,message}) => {
    return (
        <div className="center" onClick={()=> journey()}>
            <span className="button">
            {message}
            </span>
        </div>
    )
}

export default Button;