import React from 'react';
import ReactDOM from 'react-dom';

// libraries
import { CookiesProvider } from 'react-cookie';

// competent
import Router from './routes/Router';

// scrips
import * as serviceWorker from './scripts/serviceWorker';

ReactDOM.render(
	<React.StrictMode>
		<CookiesProvider>
			<Router />
		</CookiesProvider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
