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
	render() {
		let { players } = this.props;
		const { index } = this.props.match.params;
		players = players || [];
		const renderRoles = () => {
			return roles.map((role, i) => {
				console.log('role: ', role);
				return (
					<Card key={i} >
						<Image src='https://cdn.myminifactory.com/assets/object-assets/5971a8bd270db/images/720X720-beto-thingiverse.jpg' />
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
							<Button fluid primary basic >Assign</Button>
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
						<Header.Subheader>{players.length > 0 ? players[index].name : ''}</Header.Subheader>
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
