import { players1 } from '../components/mockdata';
import { INITIALIZE } from './types';

export function initializePlayers() {
	return dispatch =>
		dispatch({
			type: INITIALIZE,
			payload: players1
		});
}
