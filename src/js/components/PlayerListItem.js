import React, { Component } from 'react';
<<<<<<< HEAD
class PlayerListItem extends Component {

	render() {
		return (
			<div></div>
=======
import { connect } from 'react-redux';
import { Label, Icon, Segment, Dropdown } from 'semantic-ui-react';

import * as actions from '../actions/players';
import FlexBox from './custom/FlexBox';

class PlayerListItem extends Component {

	_unassignRole(index) {
		const { updatePlayers, players } = this.props;
		const updatedPlayers = [...players];
		updatedPlayers[index].role = null;
		updatePlayers(updatedPlayers);
	}

	render() {
		const { player, index, menuItems } = this.props;
		const icon = <Icon name='ellipsis vertical' size='large' />;
		let labelColor = '';
		if (player.role) {
			switch (player.role.team) {
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
		}
		const label = player.role ?
			<Label style={{ marginRight: '12px' }} color={labelColor} image >
				{<img src={player.role.image} alt='Player' />}
				{player.role.name}
				{<Icon onClick={() => this._unassignRole(index) } name='delete' />}
			</Label>
			:
			<Label style={{ marginRight: '12px' }} >
				Unassigned
			</Label>;
		return (
			<Segment>
				<FlexBox direction='row' align='center' justify='between' >
					{player.name}
					<FlexBox direction='row' align='center' justify='between' >
						{label}
						<Dropdown icon={icon} >
							<Dropdown.Menu>
								{menuItems}
							</Dropdown.Menu>
						</Dropdown>
					</FlexBox>
				</FlexBox>
			</Segment>
>>>>>>> 63ac8c44175116e8ef3a4f8841b6ecadeb95eabe
		);
	}
}

<<<<<<< HEAD
export default PlayerListItem;
=======
const mapStateToProps = (state) => ({
	players: state.players.players
});

export default connect(mapStateToProps, actions)(PlayerListItem);
>>>>>>> 63ac8c44175116e8ef3a4f8841b6ecadeb95eabe
