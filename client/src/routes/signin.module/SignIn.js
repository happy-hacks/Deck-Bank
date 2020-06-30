import React, { useState, useEffect } from 'react';
import './SignIn.scss';

// libraries
import { Link, Redirect } from 'react-router-dom';

// components
import BigButton from '../components/BigButton';

const SignIn = () => {
	const [authorized, setAuthorized] = useState(false);
	const [notification, setNotification] = useState(false);
	if (authorized) return <Redirect to="/decks" />; // pass data here -> https://stackoverflow.com/questions/52064303/reactjs-pass-props-with-redirect-component

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

// generic?
const SignInForm = ({ setAuthorized, handleNotification }) => {
	const [credentials, setCredentials] = useState({ username: '', password: '' });

	const SubmitSignIn = async () => {
		if (!credentials.username) return handleNotification('username is required'); // target username input
		if (!credentials.password) return handleNotification('password is required'); // target password input

		try {
			const data = await fetchJson('http://127.0.0.1:5000/sign-in', credentials);
			// pass data when redirecting
			// loader animation while validating user and fetching data
			setAuthorized(true);
		} catch (error) {
			console.log(error.message);
			// clear password field
			if (error.status === 401) handleNotification('invalid username or password try again');
			else if (error.message === 'Failed to fetch') handleNotification('a server error ocurred');
			else handleNotification('an error ocurred - try again');
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
			<span>
				No account? <Link to="sign-up">sign up</Link>
			</span>
			<BigButton text="Enter" onClick={SubmitSignIn} />
		</form>
	);
};

// modulate
const Notification = ({ message, resetNotification }) => {
	const [active, setActive] = useState(false);

	// handle promises when transitioning to other route
	// console for error message
	const notificationCycle = async () => {
		await sleep(1); // updates after mount
		setActive(true); // start the transition
		await sleep(4000); // locks the transitions for 4 seconds
		setActive(false); // starts back transition
		await sleep(1000); // waits to detach notifications
		resetNotification(true); // detach component
	};

	useEffect(() => {
		notificationCycle();
	}, []);

	return (
		<div className={'notification'} style={{ right: active ? '-1rem' : '-100%' }}>
			{message}
		</div>
	);
};

// modulate
const fetchJson = async (APIUrl, body) => {
	const options = {
		method: 'POST',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(body),
	};

	const response = await fetch(APIUrl, options);

	if (response.ok) return await response.json();
	else throw new HTTPError(response.status, 'unauthorized');
};

// modulate
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// modulate
class HTTPError extends Error {
	constructor(status, ...params) {
		super(...params);
		this.name = 'HTTPError';
		this.status = status;
	}
}
