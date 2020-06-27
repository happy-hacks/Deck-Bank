import React from 'react';

// components
import BigButton from './components/BigButton';

const SignIn = () => {
	return (
		<div>
			<h2>Sign In</h2>
			<BigButton text="Enter" onClick={() => console.log('enter clicked!')} />
		</div>
	);
};

export default SignIn;
