import { UPDATE_PLAYERS, UPDATE_DEAD_PLAYERS } from '../actions/types';

export default function (state = {}, action) {
	switch (action.type) {
		case UPDATE_PLAYERS:
			return { ...state, players: action.payload };
		case UPDATE_DEAD_PLAYERS:
			return { ...state, deadPlayers: action.payload };
		default:
			return state;
	}
}
