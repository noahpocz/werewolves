import React, { Component, ReactElement } from 'react'
import { connect } from 'react-redux'
import { Label, Icon, Segment, Dropdown } from 'semantic-ui-react'
import FlexBox from './custom/FlexBox'

import { Players, Player } from '../model/player'

import * as actions from '../actions'
import { RootState } from '../reducers'

type Props = {
	player: Player
	index: number
	menuItems: Array<any>
	inverted: boolean
	unassignable?: boolean
	// Redux State
	players: Players
	// Redux Action Creators
	updatePlayers: typeof actions.updatePlayers
}

class PlayerListItem extends Component<Props> {

	_unassignRole = (index: number) => {
		const { updatePlayers, players } = this.props
		const updatedPlayers = [...players]
		updatedPlayers[index].role = undefined
		updatePlayers(updatedPlayers)
	}

	render() {
		const { player, index, menuItems, inverted, unassignable } = this.props
		const icon = <Icon name='ellipsis vertical' size='large' />
		let labelColor: any = ''
		if (player.role) {
			switch (player.role.team) {
				case 'Werewolves':
					labelColor = 'red'
					break
				case 'Villagers':
					labelColor = 'brown'
					break
				case 'Other':
					labelColor = 'purple'
					break
				default:
					labelColor = undefined
					break
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
			</Label>

		const sheriffBadge = player.sheriff ? <Icon name='star' size='large' /> : undefined
		return (
			<Segment inverted={inverted} className={inverted ? 'segment--night' : 'segment'} color={player.charmed ? 'purple' : undefined} >
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
		)
	}
}

const mapStateToProps = (state: RootState) => ({
	players: state.players.players,
})

export default connect(mapStateToProps, actions)(PlayerListItem)
