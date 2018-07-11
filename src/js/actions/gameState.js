import { TOGGLE_PHASE } from './types';

export function togglePhase() {
	return (dispatch, getState) => {
		const { morning } = getState().gameState;
		dispatch({
			type: TOGGLE_PHASE,
			payload: !morning
		});
	};
}

