import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Header, Button, Icon, Segment } from 'semantic-ui-react';

import * as actions from '../actions/players';

class LandingPage extends Component {

	componentDidMount() {
		this.props.initializePlayers();
	}

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
					<Button as={Link} to='/gameSetup' primary size='huge'>
						Start Game
						<Icon name='right arrow' />
					</Button>
				</Container>
			</Segment>
		);
	}
}

const mapStateToProps = (state) => ({
	players: state.players.players
});

export default connect(mapStateToProps, actions)(LandingPage);
