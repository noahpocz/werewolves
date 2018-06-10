import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Header, Button } from 'semantic-ui-react';

import FlexBox from './custom/FlexBox';
import MainHeader from './MainHeader';

import * as actions from '../actions/players';

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

		this.state = {
			morning: true
		};
	}

	_phaseFromBool(b) {
		return b ? 'morning' : 'night';
	}

	render() {

		const { history } = this.props;

		const { morning } = this.state;

		const phaseHeader = this._phaseFromBool(morning);

		return (
			<div>
				<MainHeader />
				<div style={styles.mainContent} >
					<FlexBox direction='row' justify='start' >
						<FlexBox direction='column'>
							<Header as='h1'>{phaseHeader.charAt(0).toUpperCase() + phaseHeader.slice(1)}</Header>
							<Button onClick={() => {
								this.setState({ morning: !morning }, () => {
									history.push(`/${this._phaseFromBool(!morning)}`);
								});
							}}>
								{`Go to ${this._phaseFromBool(!morning)}`}
							</Button>
						</FlexBox>
					</FlexBox>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	players: state.players.players
});

export default connect(mapStateToProps, actions)(GamePlay);
