import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Header, Button, Divider } from 'semantic-ui-react';

import FlexBox from './custom/FlexBox';
import MainHeader from './MainHeader';

import * as actions from '../actions';
import PlayerListItem from './PlayerListItem';

const styles = {
	mainContent: {
		margin: '48px',
		padding: '48px'
	}
};

class GamePlay extends Component {

	constructor() {
		super();

		this._phaseFromBool = this._phaseFromBool.bind(this);
		this._togglePhase = this._togglePhase.bind(this);
	}

	_phaseFromBool(b) {
		return b ? 'Morning' : 'Night';
	}

	_togglePhase() {
		this.props.togglePhase();
	}

	render() {
		const { morning } = this.props;
		let { players } = this.props;
		players = players || [];
		const renderPlayers = () => {
			return players.map((player, i) => {
				return (
					<PlayerListItem player={player} key={i} />
				);
			});
		};
		return (
			<div>
				<MainHeader />
				<div style={styles.mainContent} >
					<FlexBox justify='start' align='start' >
						<FlexBox direction='column' align='start'>
							<Header as='h1' >
								{this._phaseFromBool(morning)}
							</Header>
							<FlexBox direction='row' >
								<Button primary onClick={this._togglePhase} >
									{`Go to ${this._phaseFromBool(!morning)}`}
								</Button>
								<Button as={Link} to='/graveyard' >
									Graveyard
								</Button>
							</FlexBox>
						</FlexBox>
					</FlexBox>
					<Divider />
					{renderPlayers()}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	players: state.players.players,
	morning: state.gameState.morning
});

export default connect(mapStateToProps, actions)(GamePlay);
