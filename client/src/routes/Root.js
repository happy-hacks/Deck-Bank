import React from 'react';
import '../sass/Root.scss';

// libraries
import { BrowserRouter as Router } from 'react-router-dom';

// component
import Routes from './Routes.js';

// side bar
import SideBar from './SideBar';
import Footer from './Footer';

const Root = () => {
	return (
		<div className="App">
			<Router>
				<Routes />
				<Footer />
				{false && <SideBar /> /* show on authorized */}
			</Router>
		</div>
	);
};

export default Root;
