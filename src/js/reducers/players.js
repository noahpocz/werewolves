import { UPDATE_PLAYERS } from '../actions/types';

export default function (state = {}, action) {
	switch (action.type) {
		case UPDATE_PLAYERS:
			return { ...state, players: action.payload };
		default:
			return state;
	}
}
