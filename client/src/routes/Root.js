import React from 'react';
import '../sass/Root.scss';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const Root = () => {
	return (
		<Router className="App">
			<Switch>
				<Route exact path="/">
					<Home />
				</Route>
				<Route path="/login">
					<Login />
				</Route>
				<Route path="*">
					<Error />
				</Route>
			</Switch>
		</Router>
	);
};

const Home = () => {
	return <h2>Home</h2>;
};

const Login = () => {
	return <h2>Login</h2>;
};

const Error = () => {
	return <h2>Error</h2>;
};

export default Root;
