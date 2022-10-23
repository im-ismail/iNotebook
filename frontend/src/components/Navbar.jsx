import React, { useRef, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import '../CSS/navbar.css';
import noteContext from '../context/NoteContext';

const Navbar = () => {
    const { isLoggedIn } = useContext(noteContext);

    const sidemenu = useRef();
    const toggleSidemenu = (e) => {
        sidemenu.current.classList.toggle('w40');
    };

    return (
        <div className="nav-container">
            <i className="fa-solid fa-bars" onClick={toggleSidemenu}></i>
            <h1 className='nav-heading'>iNotebook</h1>
            <div className='navbar' ref={sidemenu}>
                <i className="fa-regular fa-circle-xmark" onClick={toggleSidemenu}></i>
                <ul className="nav">
                    <li className="nav-item">
                        <NavLink className="nav-link" to='/'>iNotebook</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to='/feature'>Features</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to='/about'>About</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to='/contact'>Contact Us</NavLink>
                    </li>
                    {isLoggedIn ? <li className="nav-item">
                        <NavLink className="nav-link" to='/logout'>Logout</NavLink>
                    </li> : <>
                        <li className="nav-item">
                            <NavLink className="nav-link" to='/login'>Login</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to='/register'>Sign-Up</NavLink>
                        </li>
                    </>}
                </ul>
            </div>
        </div>
    )
}

export default Navbar;