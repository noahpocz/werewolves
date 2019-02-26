import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Header, Divider, Button } from 'semantic-ui-react'

import PlayerList from './PlayerList'
import MainHeader from './MainHeader'

import { RootState } from '../reducers'

type Props = {
	morning: boolean
}

class GameSetup extends Component<Props> {
	render() {
		const { morning } = this.props
		return (
			<div style={{ height: window.innerHeight, backgroundColor: morning ? '#FAFAFA' : '#313131' }} >
				<MainHeader inverted={!morning} />
				<div className='main-content' >
					<div>
						<Header as='h1' inverted={!morning} >
							Select Roles
						</Header>
						<Button primary as={Link} to='/gameplay' inverted={!morning} >
							Confirm
						</Button>
						<Button as={Link} to={'/addPlayer'} inverted={!morning} >
							Add Player
						</Button>
						<Button inverted={!morning} >
							Randomize
						</Button>
						<Divider />
					</div>
					<PlayerList />
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state: RootState) => ({
	morning: state.gameState.morning
})

export default connect(mapStateToProps, null)(GameSetup)
