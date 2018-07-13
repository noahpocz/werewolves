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

class Graveyard extends Component {

	constructor(props) {
		super(props);

		this._revivePlayer = this._revivePlayer.bind(this);
	}

	_revivePlayer(index) {
		const { updatePlayers, updateDeadPlayers, players, deadPlayers } = this.props;
		const updatedDeadPlayers = deadPlayers ? [...deadPlayers] : [];
		const updatedPlayers = [...players];
		updatedPlayers.splice(index, 0, updatedPlayers[index]);
		updatedDeadPlayers.splice(index, 1);
		updatePlayers(updatedPlayers);
		updateDeadPlayers(updatedDeadPlayers);
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

	render() {
		let { deadPlayers } = this.props;
		const { morning } = this.props;
		deadPlayers = deadPlayers || [];
		console.log('this.props.match: ', this.props.match);
		return (
			<div style={{ height: window.innerHeight, backgroundColor: morning ? '' : '#313131' }} >
				<MainHeader inverted={!morning} />
				<div style={styles.mainContent} >
					<FlexBox justify='start' align='start' >
						<FlexBox direction='column' align='start'>
							<Header inverted={!morning} as='h1' >
								Graveyard
							</Header>
							<FlexBox direction='row' >
								<Button primary as={Link} to='/gameplay' inverted={!morning} >
									Go Back
								</Button>
							</FlexBox>
						</FlexBox>
					</FlexBox>
					<Divider />
					{deadPlayers.length > 0 ?
						<PlayerList players={deadPlayers} /> :
						<Header inverted={!morning} as='h3' >
								No players are dead.
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

export default connect(mapStateToProps, actions)(Graveyard);
