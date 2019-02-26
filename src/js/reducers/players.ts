import { UPDATE_PLAYERS } from '../actions'
import { Players } from '../model/player'

export type PlayerState = {
	players: Players
	deadPlayers: Players
}

const initialState: PlayerState = {
	players: [],
	deadPlayers: []
}

export default function (state: PlayerState = initialState, action: any): PlayerState {
	switch (action.type) {
		case UPDATE_PLAYERS:
			return { ...state, players: action.payload }
		default:
			return state
	}
}
