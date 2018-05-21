import { INITIALIZE } from '../actions/types';

export default function (state = {}, action) {
	switch (action.type) {
		case INITIALIZE:
			return { ...state, players: action.payload };
		default:
			return state;
	}
}
