import React from 'react';
import '../sass/Root.scss';

// components
import { TransitionSwitch as Switch, TransitionRoute as Route } from './components/Transition';

// routes
import Decks from './Decks.js';
import CreateDeck from './CreateDeck.js';
import Profile from './Profile.js';
import SignIn from './SignIn/SignIn.js';
import SignUp from './SignUp/SignUp.js';
import Error from './Error.js';

export default () => {
	return (
		<Switch>
			<Route exact path="/">
				<SignIn />
			</Route>

			<Route path="/sign-up">
				<SignUp />
			</Route>

			<Route path="/profile">
				<Profile />
			</Route>

			<Route path="/decks">
				<Decks />
			</Route>

			<Route path="/create-deck">
				<CreateDeck />
			</Route>

			<Route path="*">
				<Error />
			</Route>
		</Switch>
	);
};
