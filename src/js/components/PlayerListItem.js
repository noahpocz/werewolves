import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Label, Icon, Segment, Dropdown } from 'semantic-ui-react';

import * as actions from '../actions';
import FlexBox from './custom/FlexBox';

class PlayerListItem extends Component {

	_unassignRole(index) {
		const { updatePlayers, players } = this.props;
		const updatedPlayers = [...players];
		updatedPlayers[index].role = null;
		updatePlayers(updatedPlayers);
	}

	render() {
		const { player, index, menuItems, inverted } = this.props;
		let { unassignable } = this.props;
		unassignable = unassignable || false;
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
				{ unassignable ? <Icon onClick={() => this._unassignRole(index) } name='delete' /> : ''}
			</Label>
			:
			<Label style={{ marginRight: '12px' }} >
				Unassigned
			</Label>;

		const sheriffBadge = player.sheriff ? <Icon name='star' size='large' /> : '';
		return (
			<Segment inverted={inverted} style={{ backgroundColor: inverted ? '#424242' : '',
				boxShadow: inverted ? '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.12)' : '',
				border: '1px solid rgba(34,36,38,.15)' }} color={player.charmed ? 'purple' : ''} >
				<FlexBox direction='row' align='center' justify='between' >
					<FlexBox direction='row' align='center' justify='between' >
						<FlexBox marginRight='small' >
							{player.name}
						</FlexBox>
						{sheriffBadge}
					</FlexBox>
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
		);
	}
}

const mapStateToProps = (state) => ({
	players: state.players.players,
});

export default connect(mapStateToProps, actions)(PlayerListItem);
