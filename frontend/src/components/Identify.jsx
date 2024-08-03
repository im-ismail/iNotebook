import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import noteContext from '../context/NoteContext';

const Identify = ({ showAlert }) => {

    const { isLoggedIn, isIdentified, setIsIdentified } = useContext(noteContext);
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        email: "",
        dob: "",
    });
    const { email, dob } = userData;

    // Handling change event
    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    // identifying user for resetting password
    const identifyUser = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/user/identify`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(userData),
            });
            const text = await res.text();
            if (!res.ok) {
                throw new Error(text);
            };
            showAlert(text, 'success');
            setIsIdentified(true);
            setTimeout(() => {
                setIsIdentified(false);
            }, 120000);
            setUserData({
                email: "",
                dob: "",
            });
            navigate('/reset-password');
        } catch (error) {
            showAlert(error.message, 'danger');
            console.log(error);
        };
    };

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/');
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
                        Enter your email address and date of birth associated with your account
                        to verify yourself
                    </p>
                    <form onSubmit={identifyUser}>
                        <div>
                            <input type='email' name='email' placeholder='Enter your email address' required value={email} onChange={handleChange} ></input>
                        </div>
                        <div>
                            <input type="text" name="dob" placeholder="Date of birth" required value={dob} onChange={handleChange} ></input>
                        </div>
                        <div>
                            <button type='submit' className='login-btn'>Verify</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
};

export default Identify;