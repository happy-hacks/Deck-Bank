// react
import React from 'react';

// libraries
import { BrowserRouter } from 'react-router-dom';

// component
import { TransitionSwitch as Switch } from './statics/Transition';

// routes
import SignIn from './SignIn.js';
import SignUp from './SignUp.js';
import Decks from './Decks.js';
import CreateDeck from './CreateDeck.js';
import Profile from './Profile.js';
import Error from './Error.js';

const Router = () => (
	<BrowserRouter>
		<Switch>
			<SignIn exact path="/" />
			<SignUp path="/sign-up" />
			<Decks path="/decks" />
			<CreateDeck path="/create-deck" />
			<Profile path="/profile" />
			<Error path="*" />
		</Switch>
	</BrowserRouter>
);

export default Router;
