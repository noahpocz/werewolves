import React, { Component, ReactElement } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { Divider, Dropdown, Header } from 'semantic-ui-react'

import PlayerListItem from './PlayerListItem'

import { Players, Player } from '../model/player'

import * as actions from '../actions'
import { RootState } from '../reducers'

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

class PlayerList extends Component<Props> {

	_moveUp = (name: string) => {
		const { updatePlayers, players } = this.props
		const updatedPlayers = [...players]
		const index = updatedPlayers.findIndex(player => player.name === name)
		let aboveIsDead = true
		let aboveIndex = index - 1
		while (aboveIsDead) {
			if (updatedPlayers[aboveIndex].alive) {
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
		const { updatePlayers, players } = this.props
		const updatedPlayers = [...players]
		const index = updatedPlayers.findIndex(player => player.name === name)
		let belowIsDead = true
		let belowIndex = index + 1
		while (belowIsDead) {
			if (updatedPlayers[belowIndex].alive) {
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
		const { players, morning, match } = this.props
		let gameState = ''
		if (match.url.includes('gameSetup')) {
			gameState = 'gameSetup'
		} else if (match.url.includes('gameplay')) {
			gameState = 'gameplay'
		} else if (match.url.includes('graveyard')) {
			gameState = 'graveyard'
		}
		const renderPlayers = () => {
			if (players.length === 0) {
				return (
					<Header inverted={!morning} as='h3' >
						No players to show.
					</Header>
				)
			}
			return players.map((player, i, players) => {
				let renderCondition = true
				switch (gameState) {
					case 'gameSetup':
						renderCondition = true
						break
					case 'gameplay':
						renderCondition = player.alive
						break
					case 'graveyard':
						renderCondition = !player.alive
						break
					default:
						renderCondition = true
				}
				if (renderCondition) {
					const assignRole = <Dropdown.Item as={Link} to={`/roleList/${i}`} >Assign Role</Dropdown.Item>
					const moveUp = i !== 0 ?
						<Dropdown.Item onClick={() => this._moveUp(player.name)} >Move Up</Dropdown.Item> : undefined
					const moveDown = i !== players.length - 1 ?
						<Dropdown.Item onClick={() => this._moveDown(player.name)} >Move Down</Dropdown.Item> : undefined
					const deletePlayer = <Dropdown.Item onClick={() => this._deletePlayer(player.name)} style={{ color: 'red' }}  >Delete</Dropdown.Item>
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
				}
				return null
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
