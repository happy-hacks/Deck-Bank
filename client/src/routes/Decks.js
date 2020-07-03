import React from 'react';

// components
import { TransitionRoute as Route } from './statics/Transition';

const Decks = (props) => {
	return (
		<Route {...props}>
			<main>
				<h2>Decks</h2>
			</main>
		</Route>
	);
};

export default Decks;
