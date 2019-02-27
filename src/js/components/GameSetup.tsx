import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Header, Divider, Button } from 'semantic-ui-react'

import FlexBox from './custom/FlexBox'
import PlayerList from './PlayerList'
import MainHeader from './MainHeader'

class GameSetup extends Component {
	render() {
		return (
			<div className='app' >
				<MainHeader />
				<div className='main-content' >
					<FlexBox direction='column' align='start' className='title-header' >
						<Header as='h1' >
							Select Roles
						</Header>
						<FlexBox direction='row' >
							<Button primary as={Link} to='/gameplay' >
								Confirm
							</Button>
							<Button as={Link} to={'/addPlayer'} >
								Add Player
							</Button>
							<Button disabled >
								Randomize
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

export default connect(null, null)(GameSetup)
