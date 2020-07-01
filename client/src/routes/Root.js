import React from 'react';
import '../sass/Root.scss';

// libraries
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// routes
import Decks from './Decks.js';
import CreateDeck from './CreateDeck.js';
import Profile from './Profile.js';
import SignIn from './SignIn/SignIn.js';
import SignUp from './SignUp/SignUp.js';
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
						<SideBar />
					</Route>

					<Route path="/decks">
						<Decks />
						<SideBar />
					</Route>

					<Route path="/create-deck">
						<CreateDeck />
						<SideBar />
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
