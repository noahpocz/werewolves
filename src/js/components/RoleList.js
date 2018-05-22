import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header, Divider, Button, Card, Image } from 'semantic-ui-react';

import { roles } from './mockdata';
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

class RoleList extends Component {

	_assignRole(roleName, players) {
		const { updatePlayers, history } = this.props;
		const { index } = this.props.match.params;
		const updatedPlayers = [...players];
		updatedPlayers[index].role = roleName;
		updatePlayers(updatedPlayers);
		history.push('/gameSetup');
	}

	render() {
		let { players } = this.props;
		const { index } = this.props.match.params;
		players = players || [];
		const renderRoles = () => {
			return roles.map((role, i) => {
				const cardColor = role.name === players[index].role ? 'blue' : '';
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
							<Button fluid primary basic onClick={() => this._assignRole(role.name, players)} >Assign</Button>
						</Card.Content>
					</Card>
				);
			});
		};
		return (
			<div style={styles.mainContent} >
				<div>
					<Header as='h1' >
						Assign Role
						<Header.Subheader>{players.length > 0 ? `${players[index].name} // ${players[index].role}` : ''}</Header.Subheader>
					</Header>
					<Button>Randomize</Button>
					<Divider />
				</div>
				<Card.Group>
					{renderRoles()}
				</Card.Group>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	players: state.players.players
});

export default connect(mapStateToProps, actions)(RoleList);
