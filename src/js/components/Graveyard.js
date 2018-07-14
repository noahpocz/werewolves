import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Header, Button, Divider } from 'semantic-ui-react';

import FlexBox from './custom/FlexBox';
import MainHeader from './MainHeader';
import PlayerList from './PlayerList';

import * as actions from '../actions';

const styles = {
	mainContent: {
		margin: '48px',
		padding: '48px'
	}
};

class Graveyard extends Component {
	render() {
		let { players } = this.props;
		const { morning } = this.props;
		players = players || [];
		console.log('this.props.match: ', this.props.match);
		return (
			<div style={{ height: window.innerHeight, backgroundColor: morning ? '#FAFAFA' : '#313131' }} >
				<MainHeader inverted={!morning} />
				<div style={styles.mainContent} >
					<FlexBox justify='start' align='start' >
						<FlexBox direction='column' align='start'>
							<Header inverted={!morning} as='h1' >
								Graveyard
							</Header>
							<FlexBox direction='row' >
								<Button primary as={Link} to='/gameplay' inverted={!morning} >
									Go Back
								</Button>
							</FlexBox>
						</FlexBox>
					</FlexBox>
					<Divider />
					{players.length > 0 ?
						<PlayerList players={players} /> :
						<Header inverted={!morning} as='h3' >
								No players are dead.
						</Header>
					}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	players: state.players.players,
	morning: state.gameState.morning
});

export default connect(mapStateToProps, actions)(Graveyard);
