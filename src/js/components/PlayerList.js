import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Divider, Dropdown } from 'semantic-ui-react';

import PlayerListItem from './PlayerListItem';

import * as actions from '../actions';

class PlayerList extends Component {

	constructor(props) {
		super(props);

		this._moveUp = this._moveUp.bind(this);
		this._moveDown = this._moveDown.bind(this);
		this._revivePlayer = this._revivePlayer.bind(this);
		this._killPlayer = this._killPlayer.bind(this);
		this._charmPlayer = this._charmPlayer.bind(this);
		this._makeSheriff = this._makeSheriff.bind(this);
	}

	_moveUp(name) {
		const { updatePlayers, players } = this.props;
		const updatedPlayers = [...players];
		const index = updatedPlayers.findIndex((player) => player.name === name);
		let aboveIsDead = true;
		let aboveIndex = index - 1;
		while (aboveIsDead === true) {
			if (updatedPlayers[aboveIndex].alive === true) {
				aboveIsDead = false;
			} else {
				aboveIndex -= 1;
			}
		}
		const temp = updatedPlayers[index];
		updatedPlayers[index] = updatedPlayers[aboveIndex];
		updatedPlayers[aboveIndex] = temp;
		updatePlayers(updatedPlayers);
	}

	_moveDown(name) {
		const { updatePlayers, players } = this.props;
		const updatedPlayers = [...players];
		const index = updatedPlayers.findIndex((player) => player.name === name);
		let belowIsDead = true;
		let belowIndex = index + 1;
		while (belowIsDead === true) {
			if (updatedPlayers[belowIndex].alive === true) {
				belowIsDead = false;
			} else {
				belowIndex += 1;
			}
		}
		const temp = updatedPlayers[index];
		updatedPlayers[index] = updatedPlayers[belowIndex];
		updatedPlayers[belowIndex] = temp;
		updatePlayers(updatedPlayers);
	}

	/* Move player from deadPlayers to players */
	_revivePlayer(name) {
		const { updatePlayers, players } = this.props;
		const updatedPlayers = [...players];
		const index = updatedPlayers.findIndex((player) => player.name === name);
		updatedPlayers[index].alive = true;
		updatePlayers(updatedPlayers);
	}

	/* Move player from players to deadPlayers */
	_killPlayer(name) {
		const { updatePlayers, players } = this.props;
		const updatedPlayers = [...players];
		const index = updatedPlayers.findIndex((player) => player.name === name);
		updatedPlayers[index].alive = false;
		updatedPlayers[index].sheriff = false;
		updatePlayers(updatedPlayers);
	}

	/* Toggles the charmed status of a player */
	_charmPlayer(name) {
		const { updatePlayers, players } = this.props;
		const updatedPlayers = [...players];
		const index = updatedPlayers.findIndex((player) => player.name === name);
		updatedPlayers[index].charmed = !updatedPlayers[index].charmed;
		updatePlayers(updatedPlayers);
	}

	/* Sets a new sheriff */
	_makeSheriff(name) {
		const { updatePlayers, players } = this.props;
		const updatedPlayers = [...players];
		const currentSheriffIndex = updatedPlayers.findIndex((player) => player.sheriff);
		if (currentSheriffIndex > 0) {
			updatedPlayers[currentSheriffIndex].sheriff = false;
		}
		const index = updatedPlayers.findIndex((player) => player.name === name);
		updatedPlayers[index].sheriff = !updatedPlayers[index].sheriff;
		updatePlayers(updatedPlayers);
	}

	_makeLover(name) {
		const { updatePlayers, players } = this.props;
		const updatedPlayers = [...players];
		const index = updatedPlayers.findIndex((player) => player.name === name);
		const currentLovers = updatedPlayers.some((player, i) => player.lover);
		const isCurrentLover = currentLovers.some(currentLover => currentLover.name === name);
		if (isCurrentLover) {
			updatedPlayers[index].lover = false;
		} else if (currentLovers.length < 2) {
			updatedPlayers[index].lover = true;
		} else {
			console.log('Throw Error');
		}
		updatePlayers(updatedPlayers);
	}

	render() {
		const { players, morning, match } = this.props;
		let gameState = '';
		if (match.url.includes('gameSetup')) {
			gameState = 'gameSetup';
		} else if (match.url.includes('gameplay')) {
			gameState = 'gameplay';
		} else if (match.url.includes('graveyard')) {
			gameState = 'graveyard';
		}
		console.log('gameState: ', gameState);
		const renderPlayers = () => {
			return players.map((player, i, players) => {
				let renderCondition = true;
				switch (gameState) {
					case 'gameSetup':
						renderCondition = true;
						break;
					case 'gameplay':
						renderCondition = player.alive;
						break;
					case 'graveyard':
						renderCondition = !player.alive;
						break;
					default:
						renderCondition = true;
				}
				console.log('renderCondition: ', player.name, ': ', renderCondition);
				if (renderCondition) {
					const assignRole = <Dropdown.Item as={Link} to={`/roleList/${i}`} >Assign Role</Dropdown.Item>;
					const moveUp = i !== 0 ?
						<Dropdown.Item onClick={() => this._moveUp(player.name)} >Move Up</Dropdown.Item> : '';
					const moveDown = i !== players.length - 1 ?
						<Dropdown.Item onClick={() => this._moveDown(player.name)} >Move Down</Dropdown.Item> : '';
					const killPlayer = <Dropdown.Item onClick={() => this._killPlayer(player.name)} >Kill</Dropdown.Item>;
					const revivePlayer = <Dropdown.Item onClick={() => this._revivePlayer(player.name)} >Revive</Dropdown.Item>;
					const charmPlayer = <Dropdown.Item onClick={() => this._charmPlayer(player.name)} >{player.charmed ? 'Uncharm' : 'Charm'}</Dropdown.Item>;
					const charmDeadPlayer = <Dropdown.Item onClick={() => this._charmDeadPlayer(player.name)} >{player.charmed ? 'Uncharm' : 'Charm'}</Dropdown.Item>;
					const makeSheriff = <Dropdown.Item onClick={() => this._makeSheriff(player.name)} >{player.sheriff ? 'Remove Sheriff' : 'Make Sheriff'}</Dropdown.Item>;
					const makeLover = <Dropdown.Item>Make Lover</Dropdown.Item>;
					const markForDeath = <Dropdown.Item>Mark for Death</Dropdown.Item>;
					const markForLife = <Dropdown.Item>Mark for Life</Dropdown.Item>;
					const divider = <Divider />;
					let menuItems = '';
					switch (gameState) {
						case 'gameSetup':
							menuItems = [
								assignRole,
								divider,
								moveUp,
								moveDown
							];
							break;
						case 'gameplay':
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
							break;
						case 'graveyard':
							menuItems = [
								revivePlayer,
								charmDeadPlayer
							];
							break;
						default:
							menuItems = [];
					}
					return (
						<PlayerListItem player={player} key={i} menuItems={menuItems} inverted={!morning} />
					);
				}
				return '';
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
	players: state.players.players
});

export default withRouter(connect(mapStateToProps, actions)(PlayerList));
