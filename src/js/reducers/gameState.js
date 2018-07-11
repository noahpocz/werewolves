import { TOGGLE_PHASE } from '../actions/types';

export default function (state = { morning: true }, action) {
	switch (action.type) {
		case TOGGLE_PHASE:
			return { ...state, morning: action.payload };
		default:
			return state;
	}
}
