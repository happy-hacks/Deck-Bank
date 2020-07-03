import React from 'react';

// components
import { TransitionRoute as Route } from './statics/Transition';

const Profile = (props) => {
	return (
		<Route {...props}>
			<h2>Profile</h2>;
		</Route>
	);
};

export default Profile;
