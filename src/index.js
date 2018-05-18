import React from 'react';
import ReactDOM from 'react-dom';
import { Route, HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
// import { createStore, applyMiddleware, compose } from 'redux';
// import reduxThunk from 'redux-thunk';
// import reducers from './js/reducers/';
import registerServiceWorker from './registerServiceWorker';

/* --- Routes --- */
import App from './js/components/App';
import LandingPage from './js/components/LandingPage';

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(reducers, /* preloadedState, */ composeEnhancers(
//	applyMiddleware(reduxThunk)
// ));

const element = document.getElementById('root');
ReactDOM.render(
	<HashRouter>
		<App>
			<Route exact path='/' component={LandingPage}/>
		</App>
	</HashRouter>
	, element);
registerServiceWorker();
