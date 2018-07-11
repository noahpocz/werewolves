import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Dropdown, Header, Divider, Button } from 'semantic-ui-react';

import * as actions from '../actions';
import PlayerListItem from './PlayerListItem';
import MainHeader from './MainHeader';

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

	render() {
		let { players } = this.props;
		players = players || [];

		const renderPlayers = () => {
			return players.map((player, i, players) => {
				const moveUp = i !== 0 ?
					<Dropdown.Item onClick={() => this._moveUp(i, players)} >Move Up</Dropdown.Item> : '';
				const moveDown = i !== players.length - 1 ?
					<Dropdown.Item onClick={() => this._moveDown(i, players)} >Move Down</Dropdown.Item> : '';
				const menuItems = [
					<Dropdown.Item as={Link} to={`/roleList/${i}`} >Assign Role</Dropdown.Item>,
					<Divider />,
					moveUp,
					moveDown
				];
				return (
					<PlayerListItem player={player} index={i} menuItems={menuItems} key={i} />
				);
			});
		};
		return (
			<div>
				<MainHeader />
				<div style={styles.mainContent} >
					<div>
						<Header as='h1' >
							Select Roles
						</Header>
						<Button primary as={Link} to='/gameplay' >Confirm</Button>
						<Button as={Link} to={'/addPlayer'} >
							Add Player
						</Button>
						<Button>
							Randomize
						</Button>
						<Divider />
					</div>
					{renderPlayers()}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	players: state.players.players
});

export default connect(mapStateToProps, actions)(GameSetup);
