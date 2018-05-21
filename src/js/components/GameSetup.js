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

	componentDidMount() {
		this.props.initializePlayers();
	}

	render() {
		let { players } = this.props;
		players = players || [];
		const icon = <Icon name='ellipsis vertical' size='large' />;
		const renderPlayers = () => {
			return players.map((player, i) => {
				console.log('player: ', player);
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
										<Dropdown.Item>Move Up</Dropdown.Item>
										<Dropdown.Item>Move Down</Dropdown.Item>
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
						visible={true}
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
