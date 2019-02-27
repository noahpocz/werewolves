import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Header, Divider, Button } from 'semantic-ui-react'

import PlayerList from './PlayerList'
import MainHeader from './MainHeader'

class GameSetup extends Component {
	render() {
		return (
			<div className='app' >
				<MainHeader />
				<div className='main-content' >
					<div>
						<Header as='h1' >
							Select Roles
						</Header>
						<Button primary as={Link} to='/gameplay' >
							Confirm
						</Button>
						<Button as={Link} to={'/addPlayer'} >
							Add Player
						</Button>
						<Button disabled >
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

export default connect(null, null)(GameSetup)
