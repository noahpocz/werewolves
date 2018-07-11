import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Header, Button, Divider, Dropdown } from 'semantic-ui-react';

import FlexBox from './custom/FlexBox';
import MainHeader from './MainHeader';

import * as actions from '../actions';
import PlayerListItem from './PlayerListItem';

const styles = {
	mainContent: {
		margin: '48px',
		padding: '48px'
	}
};

class GamePlay extends Component {

	constructor() {
		super();

		this._phaseFromBool = this._phaseFromBool.bind(this);
		this._togglePhase = this._togglePhase.bind(this);
		this._moveUp = this._moveUp.bind(this);
		this._moveDown = this._moveDown.bind(this);
	}

	_phaseFromBool(b) {
		return b ? 'Morning' : 'Night';
	}

	_togglePhase() {
		this.props.togglePhase();
	}

	_moveUp(index, players) {
		const { updatePlayers } = this.props;
		let temp = '';
		const updatedPlayers = [...players];
		temp = updatedPlayers[index];
		updatedPlayers[index] = updatedPlayers[index - 1];
		updatedPlayers[index - 1] = temp;
		updatePlayers(updatedPlayers);
	}

	_moveDown(index, players) {
		const { updatePlayers } = this.props;
		let temp = '';
		const updatedPlayers = [...players];
		temp = updatedPlayers[index];
		updatedPlayers[index] = updatedPlayers[index + 1];
		updatedPlayers[index + 1] = temp;
		updatePlayers(updatedPlayers);
	}

	_killPlayer(index) {
		const { updatePlayers, players } = this.props;
		const updatedPlayers = [...players];
		updatedPlayers[index].alive = false;
		updatePlayers(updatedPlayers);
	}

	render() {
		const { morning } = this.props;
		let { players } = this.props;
		players = players || [];
		let playerCount = 0;
		players.forEach((player) => {
			if (player.alive) {
				playerCount++;
			}
		});
		const renderPlayers = () => {
			return players.map((player, i, players) => {
				if (player.alive) {
					const moveUp = i !== 0 ?
						<Dropdown.Item onClick={() => this._moveUp(i, players)} >Move Up</Dropdown.Item> : '';
					const moveDown = i !== players.length - 1 ?
						<Dropdown.Item onClick={() => this._moveDown(i, players)} >Move Down</Dropdown.Item> : '';
					const killPlayer = <Dropdown.Item onClick={() => this._killPlayer(i)} >Kill</Dropdown.Item>;
					const menuItems = morning ?
						<React.Fragment>
							{killPlayer}
							<Dropdown.Item>Charm</Dropdown.Item>
							<Divider />
							<Dropdown.Item>Make Sheriff</Dropdown.Item>
							<Dropdown.Item>Make Lover</Dropdown.Item>
							<Divider />
							{moveUp}
							{moveDown}
						</React.Fragment> :
						<React.Fragment>
							<Dropdown.Item>Mark for Death</Dropdown.Item>
							<Dropdown.Item>Mark for Life</Dropdown.Item>
							<Divider />
							{killPlayer}
							<Dropdown.Item>Charm</Dropdown.Item>
							<Divider />
							<Dropdown.Item>Make Sheriff</Dropdown.Item>
							<Dropdown.Item>Make Lover</Dropdown.Item>
							<Divider />
							{moveUp}
							{moveDown}
						</React.Fragment>;
					return (
						<PlayerListItem player={player} key={i} menuItems={menuItems} inverted={!morning} />
					);
				}
				return '';
			});
		};
		return (
			<div style={{ height: window.innerHeight, backgroundColor: morning ? '' : '#313131' }} >
				<MainHeader inverted={!morning} />
				<div style={styles.mainContent} >
					<FlexBox justify='start' align='start' >
						<FlexBox direction='column' align='start'>
							<Header inverted={!morning} as='h1' >
								{this._phaseFromBool(morning)}
							</Header>
							<FlexBox direction='row' >
								<Button primary onClick={this._togglePhase} inverted={!morning} >
									{`Go to ${this._phaseFromBool(!morning)}`}
								</Button>
								<Button as={Link} to='/graveyard' inverted={!morning} >
									Graveyard
								</Button>
							</FlexBox>
						</FlexBox>
					</FlexBox>
					<Divider />
					{playerCount > 0 ? renderPlayers() : 'No players alive'}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	players: state.players.players,
	morning: state.gameState.morning
});

export default connect(mapStateToProps, actions)(GamePlay);
