import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { Header, Button, Divider } from 'semantic-ui-react'

import FlexBox from './custom/FlexBox'
import MainHeader from './MainHeader'
import PlayerList from './PlayerList'

import { Players } from '../model/player'

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
		const { morning } = this.props
		if (morning) {
			this.props.togglePhase()
			return
		}
		this._endNight()
	}

	_endNight = () => {
		// Create list of players marked for death
		// Call _killPlayer on each unless marked for life
		// Unmark all for death/life
		this.props.togglePhase()
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
								className={morning ? '' : 'button--dark'}
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
