import React from 'react';
import '../sass/Root.scss';

// libraries
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// routes
import Decks from './Decks.js';
import CreateDeck from './CreateDeck.js';
import Profile from './Profile.js';
import SignIn from './signin.module/SignIn.js';
import SignUp from './SignUp.js';
import Error from './Error.js';

// side bar
import SideBar from './SideBar';
import Footer from './Footer';

const Root = () => {
	return (
		<div className="App">
			<Router>
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
			</Router>
			<Footer />
		</div>
	);
};

export default Root;
