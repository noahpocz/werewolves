import { UPDATE_PLAYERS } from '../actions'
import { Players } from '../model/player'

import { players1 } from '../components/mockdata'

export type PlayerState = {
	players: Players
	deadPlayers: Players
}

const initialState: PlayerState = {
	players: players1,
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
