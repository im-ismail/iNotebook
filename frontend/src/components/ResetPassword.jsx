import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import noteContext from '../context/NoteContext';

const ResetPassword = ({ showAlert }) => {

    const { isLoggedIn, isIdentified, setIsIdentified } = useContext(noteContext);
    const navigate = useNavigate();
    const [passwords, setPasswords] = useState({
        password: "",
        cPassword: ""
    });
    const { password, cPassword } = passwords;

    // Handling change event
    const handleChange = (e) => {
        setPasswords({ ...passwords, [e.target.name]: e.target.value });
    };

    // resetting password
    const resetPassword = async (e) => {
        e.preventDefault();
        if (password !== cPassword) {
            return showAlert("Password doesn't match", "warning");
        };
        try {
            const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/user/reset-password`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(passwords),
            });
            const text = await res.text();
            if (!res.ok) {
                throw new Error(text);
            };
            showAlert(text, 'success');
            setIsIdentified(false);
            setPasswords({
                password: "",
                cPassword: ""
            });
            navigate('/login');
        } catch (error) {
            showAlert(error.message, 'danger');
            console.log(error);
        };
    };

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/');
        } else if (!isIdentified) {
            navigate('/identify');
        };
    }, []);

    return (
        <div className='main-body'>
            <div className='login-heading'><h1>iNotebook</h1></div>
            <div className='login-container'>
                <div className='login-body'>
                    <h4 className="form-text">
                        Password assistance
                    </h4>
                    <p className="m15">
                        Enter new password and then confirm new password
                    </p>
                    <form onSubmit={resetPassword}>
                        <div>
                            <input type="password" name="password" placeholder="Enter new password" required onChange={handleChange} />
                        </div>
                        <div>
                            <input type="password" name="cPassword" placeholder="Confirm password" required onChange={handleChange} />
                        </div>
                        <div>
                            <button type='submit' className='login-btn'>Reset</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
};

export default ResetPassword;