import { players1 } from '../components/mockdata';
import { UPDATE_PLAYERS, UPDATE_DEAD_PLAYERS } from './types';

export function initializePlayers() {
	return dispatch =>
		dispatch({
			type: UPDATE_PLAYERS,
			payload: players1
		});
}

export function initializeDeadPlayers() {
	return dispatch =>
		dispatch({
			type: UPDATE_DEAD_PLAYERS,
			payload: []
		});
}

export function updatePlayers(updatedPlayers) {
	return dispatch =>
		dispatch({
			type: UPDATE_PLAYERS,
			payload: updatedPlayers
		});
}

export function updateDeadPlayers(updatedDeadPlayers) {
	return dispatch =>
		dispatch({
			type: UPDATE_DEAD_PLAYERS,
			payload: updatedDeadPlayers
		});
}
