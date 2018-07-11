import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Header, Button, Divider, Segment } from 'semantic-ui-react';

import FlexBox from './custom/FlexBox';
import MainHeader from './MainHeader';
import PlayerListItem from './PlayerListItem';

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
		players = players || [];
		let playerCount = 0;
		players.forEach((player) => {
			if (!player.alive) {
				playerCount++;
			}
		});
		const renderPlayers = () => {
			return players.map((player, i) => {
				if (!player.alive) {
					return (
						<PlayerListItem player={player} key={i} />
					);
				}
				return '';
			});
		};
		return (
			<div>
				<MainHeader />
				<div style={styles.mainContent} >
					<FlexBox justify='start' align='start' >
						<FlexBox direction='column' align='start'>
							<Header as='h1' >
								Graveyard
							</Header>
							<FlexBox direction='row' >
								<Button primary as={Link} to='/gameplay' >
									Go Back
								</Button>
							</FlexBox>
						</FlexBox>
					</FlexBox>
					<Divider />
					{playerCount > 0 ? renderPlayers() : 'No players in graveyard'}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	players: state.players.players
});

export default connect(mapStateToProps, actions)(Graveyard);
