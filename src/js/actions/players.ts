import { players1 } from '../components/mockdata'
import { Action, ActionCreator } from 'redux'
// import { ThunkAction } from 'redux-thunk'
import { UPDATE_PLAYERS, UPDATE_DEAD_PLAYERS } from '.'
import { Players } from '../model/player'

export const initializePlayers: ActionCreator<Action> = () => ({
	type: UPDATE_PLAYERS,
	payload: players1
})

export const initializeDeadPlayers: ActionCreator<Action> = () => ({
	type: UPDATE_DEAD_PLAYERS,
	payload: []
})

export const updatePlayers: ActionCreator<Action> = (updatedPlayers: Players) => ({
	type: UPDATE_PLAYERS,
	payload: updatedPlayers
})

export const updateDeadPlayers: ActionCreator<Action> = (updatedDeadPlayers: Players) => ({
	type: UPDATE_DEAD_PLAYERS,
	payload: updatedDeadPlayers
})
