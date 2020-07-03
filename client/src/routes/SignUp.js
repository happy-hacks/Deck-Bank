import React, { useState } from 'react';
import '../sass/Title.scss';

// libraries
import { Redirect, Link } from 'react-router-dom';

// components
import Form, { SubmitButton } from './components/Form';
import BigButton from './components/BigButton';
import Notification from './statics/Notification';
import BackgroundImage from './components/BackgroundImage';
import { TransitionRoute as Route } from './statics/Transition';

// assets
import KingImage from '../assets/king-pose.png';

const SignUp = (props) => {
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
		<Route {...props}>
			<header>
				<div className="Title">
					<span>Clash Royale</span>
					<h1>DECK BANK</h1>
				</div>
				<h1>sign up</h1>
			</header>
			<Form method="POST" url="http://127.0.0.1:5000/sign-up" onSuccess={handleSuccess} onFailure={handleNotification}>
				<input type="text" placeholder="username" name="username" autoFocus />
				<input type="password" placeholder="password" name="password" />
				<input type="password" placeholder="repeat password" name="repeated-password" />
				<span>
					Already registered? <Link to="/">sign in</Link>
				</span>
				<SubmitButton component={<BigButton text="Enter" />} />
			</Form>

			<BackgroundImage src={KingImage} alt="king image" />
			{notification && <Notification message={notification} resetNotification={resetNotification} />}
		</Route>
	);
};

export default SignUp;
