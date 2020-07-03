import React from 'react';
import '../../sass/Route.scss';

// libraries
import { Route, Switch, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

// components
import SideBar from './SideBar';
import Footer from './Footer';

// resources
// https://www.youtube.com/watch?v=qJt-FtzJ5fo&t=575s
// https://www.framer.com/motion/

export const TransitionSwitch = ({ children }) => {
	const location = useLocation();

	return (
		<AnimatePresence>
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
			<motion.div className="TransitionRoute" {...options}>
				{children}
				<Footer />
				{false && <SideBar /> /* show on authorized */}
			</motion.div>
		</Route>
	);
};
