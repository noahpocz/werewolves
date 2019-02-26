import React from 'react'
import ReactDOM from 'react-dom'
import { Route, BrowserRouter } from 'react-router-dom'

/* REDUX */
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import reduxThunk from 'redux-thunk'
import rootReducer from './js/reducers/'
// Saving to LocalStorage
import { loadState, saveState } from './localStorage'
import throttle from 'lodash.throttle'

/* STYLESHEET */
import './scss/index.scss'

/* Routes */
import App from './js/components/App'
import LandingPage from './js/components/LandingPage'
import GameSetup from './js/components/GameSetup'
import AddPlayer from './js/components/AddPlayer'
import RoleList from './js/components/RoleList'
import GamePlay from './js/components/GamePlay'
import Graveyard from './js/components/Graveyard'

import * as serviceWorker from './serviceWorker'

const w: any = window as any
const devtools: any = w.devToolsExtension ? w.devToolsExtension() : (f: any) => f
const middleware = applyMiddleware(reduxThunk)
const persistedState = loadState()
const store: any = middleware(devtools(createStore))(rootReducer, persistedState)

/* const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const persistedState = loadState()
const store = createStore(rootReducer, persistedState, composeEnhancers(
	applyMiddleware(reduxThunk),
)) */

store.subscribe(throttle(() => { saveState(store.getState()) }, 1000))

const element = document.getElementById('root')
ReactDOM.render(
	<Provider store={store} >
		<BrowserRouter>
			<App>
				<Route exact path='/' component={LandingPage} />
				<Route path='/gameSetup' component={GameSetup} />
				<Route path='/addPlayer' component={AddPlayer} />
				<Route path='/roleList/:index' component={RoleList} />
				<Route path='/gameplay' component={GamePlay} />
				<Route path='/graveyard' component={Graveyard} />
			</App>
		</BrowserRouter>
	</Provider>
	, element)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
