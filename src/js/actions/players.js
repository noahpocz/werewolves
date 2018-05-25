import { players1 } from '../components/mockdata';
import { UPDATE_PLAYERS } from './types';

export function initializePlayers() {
	return dispatch =>
		dispatch({
			type: UPDATE_PLAYERS,
			payload: players1
		});
}

export function updatePlayers(updatedPlayers) {
	return dispatch =>
		dispatch({
			type: UPDATE_PLAYERS,
			payload: updatedPlayers
		});
}
