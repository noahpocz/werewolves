import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Header, Button, Divider, Icon } from 'semantic-ui-react';

import FlexBox from './custom/FlexBox';
import MainHeader from './MainHeader';

import * as actions from '../actions/players';
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

		this.state = {
			morning: true
		};
	}

	_phaseFromBool(b) {
		return b ? 'Morning' : 'Night';
	}

	_togglePhase() {
		this.setState({ morning: !this.state.morning });
	}

	render() {
		const { morning } = this.state;
		let { players } = this.props;
		players = players || [];

		const renderPlayers = () => {
			return players.map((player, i, players) => {
				return (
					<PlayerListItem player={player} />
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
							<Button onClick={this._togglePhase} >
								{`Go to ${this._phaseFromBool(!morning)}`}
							</Button>
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
	players: state.players.players
});

export default connect(mapStateToProps, actions)(GamePlay);
