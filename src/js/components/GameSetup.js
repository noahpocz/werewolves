import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Header, Divider, Button } from 'semantic-ui-react';

import PlayerList from './PlayerList';
import MainHeader from './MainHeader';

import * as actions from '../actions';

const styles = {
	mainContent: {
		margin: '48px',
		padding: '48px'
	},
	flexBox: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center'
	}
};

class GameSetup extends Component {
	constructor(props) {
		super(props);

		this._moveUp = this._moveUp.bind(this);
		this._moveDown = this._moveDown.bind(this);
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
		let { players } = this.props;
		const { morning } = this.props;
		players = players || [];
		return (
			<div style={{ height: window.innerHeight, backgroundColor: morning ? '#FAFAFA' : '#313131' }} >
				<MainHeader inverted={!morning} />
				<div style={styles.mainContent} >
					<div>
						<Header as='h1' inverted={!morning} >
							Select Roles
						</Header>
						<Button primary as={Link} to='/gameplay' inverted={!morning} >
							Confirm
						</Button>
						<Button as={Link} to={'/addPlayer'} inverted={!morning} >
							Add Player
						</Button>
						<Button inverted={!morning} >
							Randomize
						</Button>
						<Divider />
					</div>
					<PlayerList players={players} />
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	players: state.players.players,
	morning: state.gameState.morning
});

export default connect(mapStateToProps, actions)(GameSetup);
