import React from 'react';
import '../CSS/alert.css';

const Alert = ({ alert }) => {

    const { message, type } = alert;

    return (
        <div className={`alert-container ${type}`}>
            <div className="alert">
                {message}
            </div>
        </div>
    )
}

export default Alert;