import React, { useRef } from "react";
import { NavLink } from "react-router-dom";
import '../sidemenu.css';

const Sidemenu = () => {

      const Sidemenu = useRef();
      const btn = useRef();

      const openSidemenu = (e) => {
        Sidemenu.current.style.width = "50vw";
        btn.current.style.display = "none";
      };
      window.addEventListener("click", (e) => {
        if (
          !btn.current.contains(e.target) &&
          !Sidemenu.current.contains(e.target)
        ) {
          Sidemenu.current.style.width = "0";
          btn.current.style.display = "block";
        }
      });

    return (
        <div>
            <i className="fa-solid fa-bars"></i>
            <div className="sidemenu">
                <ul className="menu">
                    <li className="menu-item">
                        <NavLink className="nav-link" to='/'>iNotebook</NavLink>
                    </li>
                    <li className="menu-item">
                        <NavLink className="nav-link" to='/feature'>Features</NavLink>
                    </li>
                    <li className="menu-item">
                        <NavLink className="nav-link" to='/about'>About</NavLink>
                    </li>
                    <li className="menu-item">
                        <NavLink className="nav-link" to='/contact'>Contact Us</NavLink>
                    </li>
                    <li className="menu-item">
                        <NavLink className="nav-link" to='/login'>Login</NavLink>
                    </li>
                    <li className="menu-item">
                        <NavLink className="nav-link" to='/register'>Sign-Up</NavLink>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidemenu;