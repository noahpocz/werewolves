import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Header, Divider, Button, Card, Image, Label, Icon } from 'semantic-ui-react';

import { roles } from './mockdata';
import * as actions from '../actions/players';
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

class RoleList extends Component {

	_assignRole(role, players) {
		const { updatePlayers, history } = this.props;
		const { index } = this.props.match.params;
		const updatedPlayers = [...players];
		updatedPlayers[index].role = role;
		updatePlayers(updatedPlayers);
		history.push('/gameSetup');
	}

	render() {
		let { players } = this.props;
		const { index } = this.props.match.params;
		players = players || [];
		const currentRole = players[index].role ? players[index].role.name : 'Unassigned';
		roles.forEach(role => {
			role.count = 0;
			players.forEach(player => {
				if (player.role) {
					if (role.name === player.role.name) {
						role.count++;
					}
				}
			});
		});
		const renderRoles = () => {
			return roles.map((role, i) => {
				let cardColor = '';
				let labelColor = '';
				switch (role.team) {
					case 'Werewolves':
						labelColor = 'red';
						break;
					case 'Villagers':
						labelColor = 'brown';
						break;
					case 'Other':
						labelColor = 'purple';
						break;
					default:
						labelColor = '';
						break;
				}
				const teamLabel =
					<Label style={{ marginRight: '12px' }} color={labelColor} >
						{role.team}
					</Label>;
				if (players[index].role) {
					cardColor = role.name === players[index].role.name ? 'blue' : '';
				}
				return (
					<Card key={i} color={cardColor} >
						<Image src={role.image} label={<Label corner='right' >{role.count}/1</Label>} />
						<Card.Content>
							<Card.Header>
								{role.name}
							</Card.Header>
							<Card.Meta>
								{teamLabel}
							</Card.Meta>
							<Card.Description>
								{role.description}
							</Card.Description>
						</Card.Content>
						<Card.Content extra>
							<Button fluid primary basic onClick={() => this._assignRole(role, players)} >Assign</Button>
						</Card.Content>
					</Card>
				);
			});
		};
		return (
			<div>
				<MainHeader />
				<div style={styles.mainContent} >
					<div>
						<Header as='h1' >
						Assign Role
							<Header.Subheader>
								<b>{players.length > 0 ? `${players[index].name}: ${currentRole}` : ''}</b>
							</Header.Subheader>
						</Header>
						<Button primary >Randomize</Button>
						<Button as={Link} to='/gameSetup' >Cancel</Button>
						<Divider />
					</div>
					<Card.Group itemsPerRow={4} stackable >
						{renderRoles()}
					</Card.Group>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	players: state.players.players
});

export default connect(mapStateToProps, actions)(RoleList);
