import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Header, Divider, Button, Card, Image } from 'semantic-ui-react';

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
		const renderRoles = () => {
			return roles.map((role, i) => {
				const cardColor = role.name === players[index].role.name ? 'blue' : '';
				return (
					<Card key={i} color={cardColor} >
						<Image src={role.image} />
						<Card.Content>
							<Card.Header>
								{role.name}
							</Card.Header>
							<Card.Meta>
								{role.team}
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
