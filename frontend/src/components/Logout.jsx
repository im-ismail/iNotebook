import React, { useEffect, useContext } from 'react';
import noteContext from '../context/NoteContext';
import { useNavigate } from 'react-router-dom';

const Logout = ({ showAlert }) => {
    const { setIsLoggedIn, setNotes } = useContext(noteContext);
    const navigate = useNavigate();

    const logout = async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/user/logout`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });
            const text = await res.text();
            if (!res.ok) {
                throw new Error(text);
            }
            showAlert(text, 'success');
            setIsLoggedIn(false);
            setNotes([]);
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
        } else (
            navigate(-1)
        );
    }, []);

    return (
        <div></div>
    )
}

export default Logout;