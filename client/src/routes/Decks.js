import React from 'react';

// components
import { TransitionRoute as Route } from './statics/Transition';

const Decks = (props) => {
	return (
		<Route {...props}>
			<h2>Decks</h2>;
		</Route>
	);
};

export default Decks;
