import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { Header, Button, Divider } from 'semantic-ui-react'

import FlexBox from './custom/FlexBox'
import MainHeader from './MainHeader'
import PlayerList from './PlayerList'

import * as actions from '../actions'
import { RootState } from '../reducers'

type Props = {
	morning: boolean
	togglePhase: typeof actions.togglePhase
}

class GamePlay extends Component<Props> {
	_phaseFromBool = (b: boolean) => {
		return b ? 'Morning' : 'Night'
	}

	_togglePhase = () => {
		this.props.togglePhase()
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
	morning: state.gameState.morning
})

const actionCreators = {
	togglePhase: actions.togglePhase,
}

export default connect(mapStateToProps, actionCreators)(GamePlay)
