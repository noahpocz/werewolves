import React, { Component, SyntheticEvent, ChangeEvent } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Header, Divider, Button, Card, Image, Label, Search } from 'semantic-ui-react'

import { roles } from './mockdata'
import FlexBox from './custom/FlexBox'
import MainHeader from './MainHeader'

import { Players, Player, Role } from '../model/player'

import * as actions from '../actions'
import { RootState } from '../reducers'

type Props = {
	players: Players
	deadPlayers: Players
	history: any
	location: any
	morning: boolean
	match: any
	updatePlayers: typeof actions.updatePlayers
	updateDeadPlayers: typeof actions.updateDeadPlayers
}

type State = {
	search: string
}

type Count = {
	count: number
}

class RoleList extends Component<Props, State> {
	constructor(props: Props) {
		super(props)

		this.state = { search: '' }
	}

	static readonly defaultProps = {
		players: []
	}

	_assignRole = (role: Role, players: Players) => {
		const { updatePlayers, history } = this.props
		const { index } = this.props.match.params
		const updatedPlayers = [...players]
		updatedPlayers[index].role = role
		updatePlayers(updatedPlayers)
		history.push('/gameSetup')
	}

	_onSearchChange = (e: any) => {
		this.setState({ search: e.target.value })
	}

	render() {
		const { players } = this.props
		const { search } = this.state
		const { index } = this.props.match.params
		const currentRole = players[index].role ? players[index].role!.name : 'Unassigned'
		roles.forEach((role: Role) => {
			role.count = 0
			players.forEach((player) => {
				if (player.role) {
					if (role.name === player.role.name) {
						role.count!++
					}
				}
			})
		})
		const filteredRoles = roles.filter((role: Role) => {
			return role.name.toLowerCase().includes(search.toLowerCase())
		})
		const renderRoles = () => {
			return filteredRoles.map((role, i) => {
				let cardColor: any = ''
				let labelColor: any = ''
				switch (role.team) {
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
				const teamLabel =
					<Label style={{ marginTop: '6px' }} color={labelColor} >
						{role.team}
					</Label>
				if (players[index].role) {
					cardColor = role.name === players[index].role!.name ? 'blue' : undefined
				}
				return (
					<Card key={i} color={cardColor} >
						<Image src={role.image} label={<Label style={{ padding: '6px', textAlign: 'right' }} corner='right' >{role.count}/1</Label>} />
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
				)
			})
		}

		return (
			<div>
				<MainHeader />
				<div className='main-content' >
					<div>
						<Header as='h1' >
							Assign Role
							<Header.Subheader>
								<b>{players.length > 0 ? `${players[index].name}: ${currentRole}` : ''}</b>
							</Header.Subheader>
						</Header>
						<FlexBox direction='row' justify='between' >
							<FlexBox direction='row' >
								<Button primary >Randomize</Button>
								<Button as={Link} to='/gameSetup' >Cancel</Button>
							</FlexBox>
							<Search placeholder='Search'
								onSearchChange={e => this._onSearchChange(e)}
								showNoResults={false} />
						</FlexBox>
						<Divider />
					</div>
					<Card.Group itemsPerRow={4} stackable >
						{renderRoles()}
					</Card.Group>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state: RootState) => ({
	players: state.players.players
})

export default connect(mapStateToProps, actions)(RoleList)
