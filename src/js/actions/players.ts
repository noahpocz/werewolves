import { players1 } from '../components/mockdata'
import { Action, ActionCreator } from 'redux'
// import { ThunkAction } from 'redux-thunk'
import { UPDATE_PLAYERS } from '.'
import { Players } from '../model/player'

export const initializePlayers: ActionCreator<Action> = () => ({
	type: UPDATE_PLAYERS,
	payload: players1
})

export const updatePlayers: ActionCreator<Action> = (updatedPlayers: Players) => ({
	type: UPDATE_PLAYERS,
	payload: updatedPlayers
})
