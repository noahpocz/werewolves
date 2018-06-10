import React from 'react';
import ReactDOM from 'react-dom';
import { Route, HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './js/reducers/';
import { loadState, saveState } from './localStorage';
import throttle from 'lodash.throttle';
import registerServiceWorker from './registerServiceWorker';

/* --- Routes --- */
import App from './js/components/App';
import LandingPage from './js/components/LandingPage';
import GameSetup from './js/components/GameSetup';
import AddPlayer from './js/components/AddPlayer';
import RoleList from './js/components/RoleList';
import GamePlay from './js/components/GamePlay';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistedState = loadState();
const store = createStore(reducers, persistedState, composeEnhancers(
	applyMiddleware(reduxThunk)
));

store.subscribe(throttle(() => {
	saveState(store.getState());
}, 1000));

const element = document.getElementById('root');
ReactDOM.render(
	<Provider store={store} >
		<HashRouter>
			<App>
				<Route exact path='/' component={LandingPage} />
				<Route path='/gameSetup' component={GameSetup} />
				<Route path='/addPlayer' component={AddPlayer} />
				<Route path='/roleList/:index' component={RoleList} />
				<Route path='/morning' component={GamePlay} />
				<Route path='/night' component={GamePlay} />
			</App>
		</HashRouter>
	</Provider>
	, element);
registerServiceWorker();
