import React from 'react';

// components
import { TransitionRoute as Route } from './statics/Transition';

const Error = (props) => {
	return (
		<Route {...props}>
			<h2>Error</h2>;
		</Route>
	);
};

export default Error;
