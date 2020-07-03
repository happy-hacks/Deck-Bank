import React, { useState, useEffect } from 'react';
import '../../sass/Notification.scss';

// scripts
import * as Utils from '../../scripts/Utils';

const Notification = ({ message, resetNotification }) => {
	const [active, setActive] = useState(false);

	// handle promises when transitioning to other route
	// console for error message
	const notificationCycle = async () => {
		await Utils.sleep(1); // updates after mount
		setActive(true); // start the transition
		await Utils.sleep(4000); // locks the transitions for 4 seconds
		setActive(false); // starts back transition
		await Utils.sleep(1000); // waits to detach notifications
		resetNotification(true); // detach component
	};

	useEffect(() => {
		notificationCycle();
	}, []);

	return (
		<div className="Notification" style={{ right: active ? '-1rem' : '-100%' }}>
			{message}
		</div>
	);
};

export default Notification;
