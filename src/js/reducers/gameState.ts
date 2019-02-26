import { TOGGLE_PHASE } from '../actions'

export type GameState = {
	morning: boolean
}

const initialState: GameState = {
	morning: true
}

export default function (state: GameState = initialState, action: any): GameState {
	switch (action.type) {
		case TOGGLE_PHASE:
			return { ...state, morning: !state.morning }
		default:
			return state
	}
}
