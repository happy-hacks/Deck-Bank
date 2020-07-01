import React, { useState } from 'react';
import './SignIn.scss';

// libraries
import { Redirect, Link } from 'react-router-dom';

// components
import Form, { SubmitButton } from '../components/Form';
import BigButton from '../components/BigButton/BigButton';
import Notification from '../components/Notification/Notification';
import BackgroundImage from '../components/BackgroundImage/BackgroundImage';

// assets
import KingImage from '../../assets/king-laugh.png';

const SignIn = () => {
	const [authorized, setAuthorized] = useState(false);
	const [notification, setNotification] = useState(false);

	// pass data here -> https://stackoverflow.com/questions/52064303/reactjs-pass-props-with-redirect-component
	if (authorized) return <Redirect to="/decks" />;

	const handleNotification = (message) => {
		setNotification(message);
	};

	const resetNotification = () => {
		setNotification(false);
	};

	const handleSuccess = (data) => {
		console.log(data);
		setAuthorized(true);
	};

	return (
		<main>
			<div>
				<div className="title">
					<span>Clash Royale</span>
					<h1>DECK BANK</h1>
				</div>
				<h1>sign in</h1>
			</div>
			<Form method="POST" url="http://127.0.0.1:5000/sign-in" onSuccess={handleSuccess} onFailure={handleNotification}>
				<input type="text" placeholder="username" name="username" autoFocus />
				<input type="password" placeholder="password" name="password" />
				<span>
					No account? <Link to="sign-up">sign up</Link>
				</span>
				<SubmitButton component={<BigButton text="Enter" />} />
			</Form>

			<BackgroundImage src={KingImage} alt="king image" />
			{notification && <Notification message={notification} resetNotification={resetNotification} />}
		</main>
	);
};

export default SignIn;
