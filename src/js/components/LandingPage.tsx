import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Header, Button, Icon, Segment, Image } from 'semantic-ui-react'

import FlexBox from './custom/FlexBox'

class LandingPage extends Component {
	render() {
		return (
			<Segment className='landing-page' inverted textAlign='center' vertical
				style={{ height: window.innerHeight, padding: '1em 0em' }} >
				<FlexBox full justify='center' align='center' >
					<Image src='https://i.imgur.com/3AErP0I.png' size='medium' />
					<Header
						as='h1'
						content='Werewolves'
						inverted
						style={{
							fontSize: '4em',
							fontWeight: 'normal'
						}}
					/>
					<Header
						as='h2'
						content='Administrative App'
						inverted
						style={{
							fontSize: '1.7em',
							fontWeight: 'normal',
							marginTop: '1em',
						}}
					/>
					<Button as={Link} to='/gameSetup' primary size='huge'>
						Start Game
						<Icon name='arrow right' />
					</Button>
				</FlexBox>
			</Segment>
		)
	}
}

export default LandingPage
