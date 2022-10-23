import React, { useState, useContext, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import noteContext from '../context/NoteContext';

const Home = ({ showAlert }) => {

	const [userData, setUserData] = useState();
	const { isLoggedIn } = useContext(noteContext);
	const navigate = useNavigate();

	// useEffect using for checking user login state
	useEffect(() => {
		if (isLoggedIn) {
			navigate('/');
		};
	}, [isLoggedIn]);
	// Handling onChange event
	const handleChange = (e) => {
		setUserData({ ...userData, [e.target.name]: e.target.value });
	};
	// Handling onSubmit event and registering user
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = 'http://localhost:5000/api/user/register';
			const res = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(userData)
			});
			const text = await res.text()
			if (res.status !== 200) {
				throw new Error(text);
			};
			setTimeout(() => {
				navigate('/login');
			}, 1500);
			showAlert(text, 'success');
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
						Create an account to use iNotebook
					</h4>
					<form onSubmit={handleSubmit}>
						<div>
							<input type='text' name='name' placeholder='Enter your name' required onChange={handleChange}></input>
						</div>
						<div>
							<input type='email' name='email' placeholder='Enter your email address' required onChange={handleChange} ></input>
						</div>
						<div>
							<input type='text' name='dob' placeholder='Enter date of birth DD/MM/YYYY' required onChange={handleChange} ></input>
						</div>
						<div>
							<input type='password' name='password' placeholder='Enter password' required onChange={handleChange} ></input>
						</div>
						<div>
							<button type='submit' className='login-btn'>Log in</button>
						</div>
					</form>
					<NavLink to='/login' className='link'>Already have an account?</NavLink>
				</div>
			</div>
		</div>
	)
}

export default Home;