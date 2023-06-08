import React, { useState, useContext, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../styles/login.css';
import noteContext from '../context/NoteContext';

const Home = ({ showAlert }) => {

  const [userData, setUserData] = useState();
  const { isLoggedIn, setIsLoggedIn } = useContext(noteContext);
  const navigate = useNavigate();

  // useEffect using for checking user login state
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn]);
  // Handling onChange event
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  // Handling user login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const url = 'http://localhost:5000/api/user/login';
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(userData)
      });
      const text = await res.text();
      if (res.status !== 200) {
        throw new Error(text);
      };
      showAlert(text, 'success');
      setIsLoggedIn(true);
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (error) {
      console.log(error);
      showAlert(error.message, 'danger');
    };
  };

  return (
    <div className='main-body'>
      <div className='login-heading'><h1>iNotebook</h1></div>
      <div className='login-container'>
        <div className='login-body'>
          <h4 className="form-text">
            Login to acces your iNotebook account
          </h4>
          <form onSubmit={handleLogin}>
            <div>
              <input type='email' name='email' placeholder='Enter your email address' required onChange={handleChange} ></input>
            </div>
            <div>
              <input type='password' name='password' placeholder='Enter password' required minLength={6} onChange={handleChange} ></input>
            </div>
            <div>
              <button type='submit' className='login-btn'>Log in</button>
            </div>
          </form>
          <NavLink to='/identify' className='link'>Forgotten password?</NavLink>
          <div className='line'></div>
          <div>
            <NavLink to='/register' className='sign-btn'>Create new account</NavLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home;