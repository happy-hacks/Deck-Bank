import React from 'react';

// libraries
import { Route, Switch, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

export const TransitionSwitch = ({ children }) => {
	const location = useLocation();

	return (
		<AnimatePresence exitBeforeEnter>
			<Switch location={location} key={location.pathname}>
				{children}
			</Switch>
		</AnimatePresence>
	);
};

export const TransitionRoute = ({ children, ...props }) => {
	const options = {
		animate: { opacity: 1, x: 0 },
		initial: { opacity: 0, x: '-100vh' },
		exit: { opacity: 0, x: '100vh' },
		transition: { type: 'tween', ease: 'anticipate', duration: 0.5 },
	};

	return (
		<Route {...props}>
			<motion.main {...options}>{children}</motion.main>
		</Route>
	);
};
