import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Divider, Dropdown } from 'semantic-ui-react';

import PlayerListItem from './PlayerListItem';

import * as actions from '../actions';

class PlayerList extends Component {

	constructor(props) {
		super(props);

		this._revivePlayer = this._revivePlayer.bind(this);
		this._killPlayer = this._killPlayer.bind(this);
		this._charmPlayer = this._charmPlayer.bind(this);
		this._charmDeadPlayer = this._charmDeadPlayer.bind(this);
		this._makeSheriff = this._makeSheriff.bind(this);
		this._moveUp = this._moveUp.bind(this);
		this._moveDown = this._moveDown.bind(this);
	}

	/* Move player from deadPlayers to players */
	_revivePlayer(index) {
		const { updatePlayers, updateDeadPlayers, alivePlayers, deadPlayers } = this.props;
		const updatedDeadPlayers = deadPlayers ? [...deadPlayers] : [];
		const updatedPlayers = [...alivePlayers];
		updatedPlayers.push(updatedDeadPlayers[index]);
		updatedDeadPlayers.splice(index, 1);
		updatePlayers(updatedPlayers);
		updateDeadPlayers(updatedDeadPlayers);
	}

	/* Move player from players to deadPlayers */
	_killPlayer(index) {
		const { updatePlayers, updateDeadPlayers, alivePlayers, deadPlayers } = this.props;
		const updatedDeadPlayers = deadPlayers ? [...deadPlayers] : [];
		const updatedPlayers = [...alivePlayers];
		updatedPlayers[index].sheriff = false;
		updatedDeadPlayers.push(updatedPlayers[index]);
		updatedPlayers.splice(index, 1);
		updatePlayers(updatedPlayers);
		updateDeadPlayers(updatedDeadPlayers);
	}

	/* Toggles the charmed status of a player */
	_charmPlayer(index) {
		const { updatePlayers, alivePlayers } = this.props;
		const updatedPlayers = [...alivePlayers];
		updatedPlayers[index].charmed = !updatedPlayers[index].charmed;
		updatePlayers(updatedPlayers);
	}

	/* Toggles the charmed status of a dead player */
	_charmDeadPlayer(index) {
		const { updateDeadPlayers, deadPlayers } = this.props;
		const updatedDeadPlayers = [...deadPlayers];
		updatedDeadPlayers[index].charmed = !updatedDeadPlayers[index].charmed;
		updateDeadPlayers(updatedDeadPlayers);
	}

	_makeSheriff(index) {
		const { updatePlayers, updateDeadPlayers, alivePlayers, deadPlayers } = this.props;
		const updatedAlivePlayers = [...alivePlayers];

		// CASE 1: Current sheriff is alive
		let aliveIndex = -1;
		const currentSheriffAlive = alivePlayers.find((player, i) => {
			if (player.sheriff) {
				aliveIndex = i;
				return true;
			}
			return false;
		});
		if (currentSheriffAlive) {
			updatedAlivePlayers[aliveIndex].sheriff = false;
		}

		// CASE 2: Current sheriff is dead
		let deadIndex = -1;
		const currentSheriffDead = deadPlayers.find((player, i) => {
			if (player.sheriff) {
				deadIndex = i;
				return true;
			}
			return false;
		});
		if (currentSheriffDead) {
			const updatedDeadPlayers = [...deadPlayers];
			updatedDeadPlayers[deadIndex].sheriff = false;
			updateDeadPlayers(updatedDeadPlayers);
		}

		// New sheriff is not current sheriff
		if (index !== aliveIndex) {
			updatedAlivePlayers[index].sheriff = true;
		}
		updatePlayers(updatedAlivePlayers);
	}

	_moveUp(index) {
		const { updatePlayers, alivePlayers } = this.props;
		let temp = '';
		const updatedPlayers = [...alivePlayers];
		temp = updatedPlayers[index];
		updatedPlayers[index] = updatedPlayers[index - 1];
		updatedPlayers[index - 1] = temp;
		updatePlayers(updatedPlayers);
	}

	_moveDown(index) {
		const { updatePlayers, alivePlayers } = this.props;
		let temp = '';
		const updatedPlayers = [...alivePlayers];
		temp = updatedPlayers[index];
		updatedPlayers[index] = updatedPlayers[index + 1];
		updatedPlayers[index + 1] = temp;
		updatePlayers(updatedPlayers);
	}

	render() {
		const { players, morning, match } = this.props;
		const renderPlayers = () => {
			return players.map((player, i, players) => {
				const assignRole = <Dropdown.Item as={Link} to={`/roleList/${i}`} >Assign Role</Dropdown.Item>;
				const moveUp = i !== 0 ?
					<Dropdown.Item onClick={() => this._moveUp(i)} >Move Up</Dropdown.Item> : '';
				const moveDown = i !== players.length - 1 ?
					<Dropdown.Item onClick={() => this._moveDown(i)} >Move Down</Dropdown.Item> : '';
				const killPlayer = <Dropdown.Item onClick={() => this._killPlayer(i)} >Kill</Dropdown.Item>;
				const revivePlayer = <Dropdown.Item onClick={() => this._revivePlayer(i)} >Revive</Dropdown.Item>;
				const charmPlayer = <Dropdown.Item onClick={() => this._charmPlayer(i)} >{player.charmed ? 'Uncharm' : 'Charm'}</Dropdown.Item>;
				const charmDeadPlayer = <Dropdown.Item onClick={() => this._charmDeadPlayer(i)} >{player.charmed ? 'Uncharm' : 'Charm'}</Dropdown.Item>;
				const makeSheriff = <Dropdown.Item onClick={() => this._makeSheriff(i)} >{player.sheriff ? 'Remove Sheriff' : 'Make Sheriff'}</Dropdown.Item>;
				const makeLover = <Dropdown.Item>Make Lover</Dropdown.Item>;
				const markForDeath = <Dropdown.Item>Mark for Death</Dropdown.Item>;
				const markForLife = <Dropdown.Item>Mark for Life</Dropdown.Item>;
				const divider = <Divider />;
				let menuItems = '';
				if (match.url.includes('gameSetup')) {
					menuItems = [
						assignRole,
						divider,
						moveUp,
						moveDown
					];
				} else if (match.url.includes('gameplay')) {
					if (morning) {
						menuItems = [
							killPlayer,
							charmPlayer,
							divider,
							makeSheriff,
							makeLover,
							divider,
							moveUp,
							moveDown
						];
					} else {
						menuItems = [
							markForDeath,
							markForLife,
							divider,
							killPlayer,
							charmPlayer,
							divider,
							makeSheriff,
							makeLover,
							divider,
							moveUp,
							moveDown
						];
					}
				} else if (match.url.includes('graveyard')) {
					menuItems = [
						revivePlayer,
						charmDeadPlayer
					];
				}
				return (
					<PlayerListItem player={player} key={i} menuItems={menuItems} inverted={!morning} />
				);
			});
		};
		return (
			<React.Fragment>
				{renderPlayers()}
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => ({
	morning: state.gameState.morning,
	alivePlayers: state.players.players,
	deadPlayers: state.players.deadPlayers,
});

export default withRouter(connect(mapStateToProps, actions)(PlayerList));
