import { combineReducers, Reducer } from 'redux'
import players, { PlayerState } from './players'
import gameState, { GameState } from './gameState'

export type RootState = {
	players: PlayerState,
	gameState: GameState
}

const rootReducer: Reducer<RootState> = combineReducers({
	players,
	gameState
})

export default rootReducer
