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
		this._makeSheriff = this._makeSheriff.bind(this);
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
		updatedPlayers[index].sheriff = true;
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
		const currentLovers = updatedPlayers.map((player, i) => {
			if (player.lover) {
				player.tempIndex = i;
				return player;
			}
			return null;
		});
		const isCurrentLover = currentLovers.some(currentLover => currentLover.tempIndex === index);
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
		const renderPlayers = () => {
			return players.map((player, i, players) => {
				const assignRole = <Dropdown.Item as={Link} to={`/roleList/${i}`} >Assign Role</Dropdown.Item>;
				const moveUp = i !== 0 ?
					<Dropdown.Item onClick={() => this._moveUp(i)} >Move Up</Dropdown.Item> : '';
				const moveDown = i !== players.length - 1 ?
					<Dropdown.Item onClick={() => this._moveDown(i)} >Move Down</Dropdown.Item> : '';
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
	players: state.players.players
});

export default withRouter(connect(mapStateToProps, actions)(PlayerList));
