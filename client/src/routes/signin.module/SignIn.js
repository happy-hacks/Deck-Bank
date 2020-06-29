import React, { useState, useEffect } from 'react';
import './SignIn.scss';

// libraries
import { Link, Redirect } from 'react-router-dom';

// components
import BigButton from '../components/BigButton';

const SignIn = () => {
	const [authorized, setAuthorized] = useState(false);
	const [notification, setNotification] = useState(false);
	if (authorized) return <Redirect to="/decks" />;

	const handleNotification = (message) => {
		setNotification(message);
	};

	const resetNotification = () => {
		setNotification(false);
	};

	return (
		<main>
			<Header content="sign in" />
			<SignInForm setAuthorized={setAuthorized} handleNotification={handleNotification} />
			{notification && <Notification message={notification} resetNotification={resetNotification} />}
		</main>
	);
};

export default SignIn;

const Header = ({ content }) => (
	<>
		<div className="title">
			<span>Clash Royale</span>
			<h1>DECK BANK</h1>
		</div>
		<h1>{content}</h1>
	</>
);

const SignInForm = ({ setAuthorized, handleNotification }) => {
	const [credentials, setCredentials] = useState({ username: '', password: '' });

	const SubmitSignIn = async () => {
		if (!credentials.username) return handleNotification('username is required'); // target username input
		if (!credentials.password) return handleNotification('password is required'); // target password input

		const options = {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(credentials),
		};

		const response = await fetch('http://127.0.0.1:5000/sign-in', options);

		if (response.ok) {
			const data = await response.json();
			// pass data when redirecting
			setAuthorized(true);
		} else {
			// reset input fields
			handleNotification('invalid username or password try again');
		}
	};

	const handleChange = (event) => {
		const { name, value } = event.target;

		setCredentials((previous) => {
			previous[name] = value;
			return previous;
		});
	};

	return (
		<form>
			<input type="text" placeholder="username" name="username" onChange={handleChange} required autoFocus />
			<input type="password" placeholder="password" name="password" onChange={handleChange} required />
			<SignUpLink />
			<BigButton text="Enter" onClick={SubmitSignIn} />
		</form>
	);
};

const Notification = ({ message, resetNotification }) => {
	const [active, setActive] = useState(false);
	const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

	// handle promises when transitioning to other route
	// console for error message
	const notificationCycle = async () => {
		setActive(true); // start the transition
		await sleep(4000); // locks the transitions for 4 seconds
		setActive(false); // starts back transition
		await sleep(1000); // waits to detach notifications
		resetNotification(true); // detach component
	};

	useEffect(() => {
		notificationCycle();
		return () => {
			setActive(false);
			resetNotification(true);
		};
	}, []);

	return (
		<div className={'notification'} style={{ right: active ? '-1rem' : '-100%' }}>
			{message}
		</div>
	);
};

const SignUpLink = () => (
	<span>
		No account? <Link to="sign-up">sign up</Link>
	</span>
);
