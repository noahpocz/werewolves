import React, { Component, SyntheticEvent, ChangeEvent } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Header, Divider, Button, Card, Image, Label, Search } from 'semantic-ui-react'

import FlexBox from './custom/FlexBox'
import MainHeader from './MainHeader'

import { Players, Player, Role, roles } from '../model/player'

import * as actions from '../actions'
import { RootState } from '../reducers'

type Props = {
	players: Players
	history: any
	location: any
	match: any
	updatePlayers: typeof actions.updatePlayers
}

type State = {
	search: string
}

type Count = {
	count: number
}

const werewolvesMaxCount = (playerCount: number) => {
	if (playerCount < 12) return 2
	if (playerCount < 18) return 3
	return 4
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
				let cardColor: any = undefined
				let buttonLabel = 'Assign'
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
				const teamLabel = (
					<Label style={{ marginTop: '6px' }} color={labelColor} >
						{role.team}
					</Label>
				)
				let selected = false
				if (players[index].role) {
					selected = role.name === players[index].role!.name
				}
				if (selected) {
					cardColor = 'blue'
					buttonLabel = 'Already Assigned'
				}
				const roleMaxCount = role.team === 'Werewolves' ? werewolvesMaxCount(players.length) : role.maxCount || 1
				const countLabel = (
					<Label style={{ padding: '6px', textAlign: 'right', color: role.count! > roleMaxCount ? 'red' : '' }} corner='right'>
						{role.count}/{roleMaxCount}
					</Label>
				)
				return (
					<Card key={i} color={cardColor} >
						<Image src={role.image} label={countLabel} />
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
							<Button fluid primary basic={!selected} onClick={() => this._assignRole(role, players)} >{buttonLabel}</Button>
						</Card.Content>
					</Card>
				)
			})
		}

		return (
			<div className='app' >
				<MainHeader />
				<div className='main-content' >
					<FlexBox direction='column' align='start' className='title-header' >
						<Header as='h1' >
							Assign Role
							<Header.Subheader>
								<b>{players.length > 0 ? `${players[index].name}: ${currentRole}` : ''}</b>
							</Header.Subheader>
						</Header>
						<FlexBox full='horizontal' direction='row' justify='between' >
							<FlexBox direction='row' >
								<Button primary disabled >Randomize</Button>
								<Button as={Link} to='/gameSetup' >Cancel</Button>
							</FlexBox>
							<Search
								placeholder='Search'
								onSearchChange={e => this._onSearchChange(e)}
								showNoResults={false}
							/>
						</FlexBox>
						<Divider className='title-header__divider' />
					</FlexBox>
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
const actionCreators = {
	updatePlayers: actions.updatePlayers
}

export default connect(mapStateToProps, actionCreators)(RoleList)
