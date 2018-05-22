import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Segment, Label, Icon, Dropdown, Header, Divider, Button, Sidebar, Menu } from 'semantic-ui-react';

import { players1 } from './mockdata';
import * as actions from '../actions/players';

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

	componentDidMount() {
		this.props.initializePlayers();
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
		const icon = <Icon name='ellipsis vertical' size='large' />;
		const renderPlayers = () => {
			return players.map((player, i, players) => {
				console.log('i: ', i);
				const moveUp = i !== 0 ?
					<Dropdown.Item onClick={() => this._moveUp(i, players)} >Move Up</Dropdown.Item> : '';
				const moveDown = i !== players.length - 1 ?
					<Dropdown.Item onClick={() => this._moveDown(i, players)} >Move Down</Dropdown.Item> : '';
				return (
					<Segment key={i} >
						<div style={styles.flexBox} >
							{player.name}
							<div style={styles.flexBox} >
								<Label style={{ marginRight: '12px' }} >
									{player.role || 'Unassigned'}
								</Label>
								<Dropdown icon={icon} >
									<Dropdown.Menu>
										<Dropdown.Item>Assign Role</Dropdown.Item>
										<Divider />
										{moveUp}
										{moveDown}
									</Dropdown.Menu>
								</Dropdown>
							</div>
						</div>
					</Segment>
				);
			});
		};
		return (
			<Sidebar.Pushable style={{ height: window.innerHeight }} >
				<div style={styles.mainContent} >
					<Sidebar
						as={Menu}
						animation='push'
						width='thin'
						direction='bottom'
						visible={false}
						icon='labeled'
						vertical >
						<Menu.Item name='home'>
							<Icon name='home' />
							Home
						</Menu.Item>
						<Menu.Item name='gamepad'>
							<Icon name='gamepad' />
							Games
						</Menu.Item>
						<Menu.Item name='camera'>
							<Icon name='camera' />
							Channels
						</Menu.Item>
					</Sidebar>
					<Sidebar.Pusher>
						<div>
							<Header as='h1' >
							Select Roles
							</Header>
							<Button primary >Confirm</Button>
							<Button>Randomize</Button>
							<Divider />
						</div>
						{renderPlayers()}
					</Sidebar.Pusher>
				</div>
			</Sidebar.Pushable>
		);
	}
}

const mapStateToProps = (state) => ({
	players: state.players.players
});

export default connect(mapStateToProps, actions)(GameSetup);
