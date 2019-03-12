import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { Header, Button, Divider } from 'semantic-ui-react'

import FlexBox from './custom/FlexBox'
import MainHeader from './MainHeader'
import PlayerList from './PlayerList'

import { Players, Elder, elderHasExtraLife } from '../model/player'

import * as actions from '../actions'
import { RootState } from '../reducers'

type Props = {
	// Redux State
	players: Players
	morning: boolean
	// Redux Action Creators
	updatePlayers: typeof actions.updatePlayers
	togglePhase: typeof actions.togglePhase
}

class GamePlay extends Component<Props> {

	_phaseFromBool = (b: boolean) => {
		return b ? 'Morning' : 'Night'
	}

	_togglePhase = () => {
		const { morning, togglePhase } = this.props
		if (morning) {
			togglePhase()
			return
		}
		this._performNightActions()
		this._unmarkPlayers()
		togglePhase()
	}

	_performNightActions = () => {
		const { players } = this.props
		// Create list of players marked for death
		const markedPlayers = players.filter(p => p.markedForDeath)
		// Call _killPlayer on each unless marked for life
		markedPlayers.forEach((player) => {
			// If marked for life do nothing
			if (player.markedForLife) return
			if (elderHasExtraLife(player.role)) {
				this._removeElderLife(player.name)
				return
			}
			this._killPlayer(player.name)
		})

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

	/* Remove the extra life of the Elder */
	_removeElderLife = (name: string) => {
		const { updatePlayers, players } = this.props
		const updatedPlayers = [...players]
		const index = updatedPlayers.findIndex(player => player.name === name);
		(updatedPlayers[index].role as Elder).extraLife = false
		updatePlayers(updatedPlayers)
	}

	_unmarkPlayers = () => {
		const { updatePlayers, players } = this.props
		const updatedPlayers = players.map((p) => {
			p.markedForDeath = false
			p.markedForLife = false
			return p
		})
		updatePlayers(updatedPlayers)
	}

	render() {
		const { morning } = this.props
		return (
			<div className={morning ? 'app' : 'app--night'} >
				<MainHeader inverted={!morning} />
				<div className='main-content' >
					<FlexBox direction='column' align='start' className='title-header' >
							<Header inverted={!morning} as='h1' >
								{this._phaseFromBool(morning)}
							</Header>
						<FlexBox direction='row' >
							<Button
								primary
								onClick={this._togglePhase}
								inverted={!morning}
							>
								{`Go to ${this._phaseFromBool(!morning)}`}
							</Button>
							<Button as={Link} to='/graveyard' inverted={!morning} >
								Graveyard
							</Button>
						</FlexBox>
						<Divider className='title-header__divider' />
					</FlexBox>
					<div>
						<PlayerList />
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state: RootState) => ({
	morning: state.gameState.morning,
	players: state.players.players
})

const actionCreators = {
	togglePhase: actions.togglePhase,
	updatePlayers: actions.updatePlayers,
}

export default connect(mapStateToProps, actionCreators)(GamePlay)
