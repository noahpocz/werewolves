import React, { Component } from 'react';
import { Container, Header, Button, Icon, Segment } from 'semantic-ui-react';

import MainHeader from './MainHeader';

class LandingPage extends Component {
	render() {
		return (
			<Segment inverted textAlign='center' vertical
				style={{ height: window.innerHeight, padding: '1em 0em' }} >
				<Container text>
					<Header
						as='h1'
						content='Werewolves'
						inverted
						style={{
							fontSize: '4em',
							fontWeight: 'normal',
							marginBottom: 0,
							marginTop: '3em',
						}} />
					<Header
						as='h2'
						content='Administrative App'
						inverted
						style={{
							fontSize: '1.7em',
							fontWeight: 'normal',
							marginTop: '1.5em',
						}} />
					<Button primary size='huge'>
						Start Game
						<Icon name='right arrow' />
					</Button>
				</Container>
			</Segment>
		);
	}
}

export default LandingPage;
