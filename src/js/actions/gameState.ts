import { TOGGLE_PHASE } from '.'

import { Action, ActionCreator } from 'redux'
// import { ThunkAction } from 'redux-thunk'

export const togglePhase: ActionCreator<Action> = () => ({
	type: TOGGLE_PHASE
})
