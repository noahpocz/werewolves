import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Header, Button, Icon, Segment } from 'semantic-ui-react'

import FlexBox from './custom/FlexBox'

import * as actions from '../actions'

type Props = {
	// Redux Action Creators
	initializePlayers: typeof actions.initializePlayers
	initializeDeadPlayers: typeof actions.initializeDeadPlayers
}

class LandingPage extends Component<Props> {

	componentDidMount() {
		this.props.initializePlayers()
		this.props.initializeDeadPlayers()
	}

	render() {
		return (
			<Segment inverted textAlign='center' vertical
				style={{ height: window.innerHeight, padding: '1em 0em' }} >
				<FlexBox full justify='center' align='center' >
					<Header
						as='h1'
						content='Werewolves'
						inverted
						style={{
							fontSize: '4em',
							fontWeight: 'normal'
						}} />
					<Header
						as='h2'
						content='Administrative App'
						inverted
						style={{
							fontSize: '1.7em',
							fontWeight: 'normal',
							marginTop: '1em',
						}} />
					<Button as={Link} to='/gameSetup' primary size='huge'>
						Start Game
						<Icon name='arrow right' />
					</Button>
				</FlexBox>
			</Segment>
		)
	}
}

const actionCreators = {
	initializePlayers: actions.initializePlayers,
	initializeDeadPlayers: actions.initializeDeadPlayers
}

export default connect(null, actionCreators)(LandingPage)
