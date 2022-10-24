import React, { useEffect, useContext } from 'react';
import noteContext from '../context/NoteContext';
import { useNavigate } from 'react-router-dom';

const Logout = ({ showAlert }) => {
    const { isLoggedIn, setIsLoggedIn } = useContext(noteContext);
    const navigate = useNavigate();

    const logout = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/user/logout', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });
            const text = await res.text();
            if(!res.ok){
                throw new Error(text);
            }
            showAlert(text, 'success');
            setIsLoggedIn(false);
            navigate('/login');
        } catch (error) {
            console.log(error);
            showAlert(error.message, 'danger');
            navigate('/login');
        };
    };
    useEffect(() => {
        const confirm = window.confirm('Confirm by clicking OK to logout.');
        if (confirm) {
            logout();
        }else(
            navigate(-1)
        );
    }, []);


    return (
        <div></div>
    )
}

export default Logout;