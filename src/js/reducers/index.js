import { combineReducers } from 'redux';
import players from './players';
import gameState from './gameState';

const rootReducer = combineReducers({
	players,
	gameState
});

export default rootReducer;
