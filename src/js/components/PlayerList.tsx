import React, { Component, ReactElement } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { Divider, Dropdown, Header, Button, Icon } from 'semantic-ui-react'

import PlayerListItem from './PlayerListItem'

import { Players } from '../model/player'

import * as actions from '../actions'
import { RootState } from '../reducers'
import FlexBox from './custom/FlexBox'

type Props = {
	// Redux State
	players: Players
	morning: boolean
	// Redux Action Creators
	updatePlayers: typeof actions.updatePlayers
	// React Router
	history: any
	location: any
	match: any
}

const getGameState = (match: any) => {
	let gameState = ''
	if (match.url.includes('gameSetup')) {
		gameState = 'gameSetup'
	} else if (match.url.includes('gameplay')) {
		gameState = 'gameplay'
	} else if (match.url.includes('graveyard')) {
		gameState = 'graveyard'
	}
	return gameState
}

class PlayerList extends Component<Props> {

	_moveUp = (name: string) => {
		const { updatePlayers, players, match } = this.props
		const gameState = getGameState(match)
		const updatedPlayers = [...players]
		const index = updatedPlayers.findIndex(player => player.name === name)
		let aboveIsDead = true
		let aboveIndex = index - 1
		while (aboveIsDead) {
			if (updatedPlayers[aboveIndex].alive || gameState !== 'gameplay') {
				aboveIsDead = false
			} else {
				aboveIndex -= 1
			}
		}
		const temp = updatedPlayers[index]
		updatedPlayers[index] = updatedPlayers[aboveIndex]
		updatedPlayers[aboveIndex] = temp
		updatePlayers(updatedPlayers)
	}

	_moveDown = (name: string) => {
		const { updatePlayers, players, match } = this.props
		const gameState = getGameState(match)
		const updatedPlayers = [...players]
		const index = updatedPlayers.findIndex(player => player.name === name)
		let belowIsDead = true
		let belowIndex = index + 1
		while (belowIsDead) {
			if (updatedPlayers[belowIndex].alive || gameState !== 'gameplay') {
				belowIsDead = false
			} else {
				belowIndex += 1
			}
		}
		const temp = updatedPlayers[index]
		updatedPlayers[index] = updatedPlayers[belowIndex]
		updatedPlayers[belowIndex] = temp
		updatePlayers(updatedPlayers)
	}

	/* Delete player from the list */
	_deletePlayer = (name: String) => {
		const { updatePlayers, players } = this.props
		let updatedPlayers = [...players]
		updatedPlayers = updatedPlayers.filter(player => player.name !== name)
		updatePlayers(updatedPlayers)
	}

	/* Move player from deadPlayers to players */
	_revivePlayer = (name: string) => {
		const { updatePlayers, players } = this.props
		const updatedPlayers = [...players]
		const index = updatedPlayers.findIndex(player => player.name === name)
		updatedPlayers[index].alive = true
		updatePlayers(updatedPlayers)
	}

	/* Move player from players to deadPlayers */
	_killPlayer = (name: string) => {
		const { updatePlayers, players } = this.props
		const updatedPlayers = [...players]
		const index = updatedPlayers.findIndex(player => player.name === name)
		updatedPlayers[index].alive = false
		updatedPlayers[index].sheriff = false
		updatePlayers(updatedPlayers)
	}

	/* Toggles the charmed status of a player */
	_charmPlayer = (name: string) => {
		const { updatePlayers, players } = this.props
		const updatedPlayers = [...players]
		const index = updatedPlayers.findIndex(player => player.name === name)
		updatedPlayers[index].charmed = !updatedPlayers[index].charmed
		updatePlayers(updatedPlayers)
	}

	/* Sets a new sheriff */
	_makeSheriff = (name: string) => {
		const { updatePlayers, players } = this.props
		const updatedPlayers = [...players]
		const currentSheriffIndex = updatedPlayers.findIndex(player => player.sheriff)
		const currentPlayerIndex = updatedPlayers.findIndex(player => player.name === name)
		if (currentSheriffIndex >= 0 && currentSheriffIndex !== currentPlayerIndex) {
			updatedPlayers[currentSheriffIndex].sheriff = false
		}
		updatedPlayers[currentPlayerIndex].sheriff = !updatedPlayers[currentPlayerIndex].sheriff
		updatePlayers(updatedPlayers)
	}

	_makeLover = (name: string) => {
		const { updatePlayers, players } = this.props
		const updatedPlayers = [...players]
		const index = updatedPlayers.findIndex(player => player.name === name)
		const currentLovers: Players = updatedPlayers.filter((player, i) => player.lover)
		const isCurrentLover = currentLovers.some(currentLover => currentLover.name === name)
		if (isCurrentLover) {
			updatedPlayers[index].lover = false
		} else if (currentLovers.length < 2) {
			updatedPlayers[index].lover = true
		} else {
			console.log('Throw Error')
		}
		updatePlayers(updatedPlayers)
	}

	render() {
		const { morning, match } = this.props
		let { players } = this.props
		const gameState = getGameState(match)
		// If no players exist on master list
		if (players.length === 0) {
			return (
				<FlexBox full align='center' justify='center' >
					<Header inverted={!morning} as='h3' >
						No players to show
					</Header>
					<Button as={Link} to={'/addPlayer'} primary animated>
						<Button.Content visible>Add Player</Button.Content>
						<Button.Content hidden>
						<Icon name='add' />
						</Button.Content>
					</Button>
				</FlexBox>
			)
		}
		// Decide which subset of players to render
		players = players.filter((player) => {
			switch (gameState) {
				case 'gameSetup':
					return true
				case 'gameplay':
					return player.alive
				case 'graveyard':
					return !player.alive
				default:
					return true
			}
		})
		// Render message if no players to render
		if (players.length === 0) {
			let message = ''
			switch (gameState) {
				case 'gameplay':
					message = 'No players are alive'
					break
				case 'graveyard':
					message = 'No players are dead'
					break
				default:
					message = 'No players to show'
			}
			return (
				<FlexBox full align='center' justify='center' >
					<Header inverted={!morning} as='h3' >
						{message}
					</Header>
				</FlexBox>
			)
		}

		const renderPlayers = () => {
			return players.map((player, i, players) => {
				/* Menu Items */
				const assignRole = <Dropdown.Item as={Link} to={`/roleList/${i}`} >Assign Role</Dropdown.Item>
				const moveUp = i !== 0 ?
					<Dropdown.Item onClick={() => this._moveUp(player.name)} >Move Up</Dropdown.Item> : undefined
				const moveDown = i !== players.length - 1 ?
					<Dropdown.Item onClick={() => this._moveDown(player.name)} >Move Down</Dropdown.Item> : undefined
				const deletePlayer = <Dropdown.Item onClick={() => this._deletePlayer(player.name)} style={{ color: 'red' }} >Delete</Dropdown.Item>
				const killPlayer = <Dropdown.Item onClick={() => this._killPlayer(player.name)} >Kill</Dropdown.Item>
				const revivePlayer = <Dropdown.Item onClick={() => this._revivePlayer(player.name)} >Revive</Dropdown.Item>
				const charmPlayer = <Dropdown.Item onClick={() => this._charmPlayer(player.name)} >{player.charmed ? 'Uncharm' : 'Charm'}</Dropdown.Item>
				const makeSheriff = (
					<Dropdown.Item onClick={() => this._makeSheriff(player.name)} >{player.sheriff ? 'Remove Sheriff' : 'Make Sheriff'}</Dropdown.Item>
				)
				const makeLover = <Dropdown.Item>Make Lover</Dropdown.Item>
				const markForDeath = <Dropdown.Item>Mark for Death</Dropdown.Item>
				const markForLife = <Dropdown.Item>Mark for Life</Dropdown.Item>
				const divider = <Divider />
				let menuItems: Array<ReactElement | undefined> = []
				switch (gameState) {
					case 'gameSetup':
						menuItems = [
							assignRole,
							divider,
							moveUp,
							moveDown,
							divider,
							deletePlayer
						]
						break
					case 'gameplay':
						if (morning) {
							menuItems = [
								killPlayer,
								charmPlayer,
								divider,
								makeSheriff,
								makeLover,
								divider,
								moveUp,
								moveDown
							]
						} else {
							menuItems = [
								markForDeath,
								markForLife,
								divider,
								killPlayer,
								charmPlayer,
								divider,
								makeSheriff,
								makeLover,
								divider,
								moveUp,
								moveDown
							]
						}
						break
					case 'graveyard':
						menuItems = [
							revivePlayer,
							charmPlayer
						]
						break
					default:
						menuItems = []
				}
				return (
					<PlayerListItem
						player={player}
						key={i} index={i}
						menuItems={menuItems}
						inverted={!morning && (gameState === 'gameplay' || gameState === 'graveyard')}
					/>
				)
			})
		}

		return (
			<React.Fragment>
				{renderPlayers()}
			</React.Fragment>
		)
	}
}

const mapStateToProps = (state: RootState) => ({
	morning: state.gameState.morning,
	players: state.players.players,
})

const actionCreators = {
	updatePlayers: actions.updatePlayers,
}

export default withRouter(connect(mapStateToProps, actionCreators)(PlayerList))
