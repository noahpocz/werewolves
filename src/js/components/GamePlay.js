import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Header, Button, Divider } from 'semantic-ui-react';

import FlexBox from './custom/FlexBox';
import MainHeader from './MainHeader';
import PlayerList from './PlayerList';

import * as actions from '../actions';

const styles = {
	mainContent: {
		margin: '48px',
		padding: '48px'
	}
};

class GamePlay extends Component {

	constructor(props) {
		super(props);

		this._phaseFromBool = this._phaseFromBool.bind(this);
		this._togglePhase = this._togglePhase.bind(this);
		this._moveUp = this._moveUp.bind(this);
		this._moveDown = this._moveDown.bind(this);
		this._killPlayer = this._killPlayer.bind(this);
	}

	_phaseFromBool(b) {
		return b ? 'Morning' : 'Night';
	}

	_togglePhase() {
		this.props.togglePhase();
	}

	_moveUp(index) {
		const { updatePlayers, players } = this.props;
		let temp = '';
		const updatedPlayers = [...players];
		temp = updatedPlayers[index];
		updatedPlayers[index] = updatedPlayers[index - 1];
		updatedPlayers[index - 1] = temp;
		updatePlayers(updatedPlayers);
	}

	_moveDown(index) {
		const { updatePlayers, players } = this.props;
		let temp = '';
		const updatedPlayers = [...players];
		temp = updatedPlayers[index];
		updatedPlayers[index] = updatedPlayers[index + 1];
		updatedPlayers[index + 1] = temp;
		updatePlayers(updatedPlayers);
	}

	_killPlayer(index) {
		const { updatePlayers, updateDeadPlayers, players, deadPlayers } = this.props;
		const updatedDeadPlayers = deadPlayers ? [...deadPlayers] : [];
		const updatedPlayers = [...players];
		updatedDeadPlayers.splice(index, 0, updatedPlayers[index]);
		updatedPlayers.splice(index, 1);
		updatePlayers(updatedPlayers);
		updateDeadPlayers(updatedDeadPlayers);
	}

	render() {
		const { morning } = this.props;
		let { players } = this.props;
		players = players || [];
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
					{players.length > 0 ?
						<PlayerList players={players} /> :
						<Header inverted={!morning} as='h3' >
								No players are alive.
						</Header>
					}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	players: state.players.players,
	deadPlayers: state.players.deadPlayers,
	morning: state.gameState.morning
});

export default connect(mapStateToProps, actions)(GamePlay);
