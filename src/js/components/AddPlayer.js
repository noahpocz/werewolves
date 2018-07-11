import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Header, Input, Button } from 'semantic-ui-react';
import FlexBox from './custom/FlexBox';

import MainHeader from './MainHeader';

import * as actions from '../actions';

const styles = {
	mainContent: {
		margin: '48px',
		padding: '48px'
	},
	flexBox: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center'
	}
};

class AddPlayer extends Component {

	constructor() {
		super();

		this._submit = this._submit.bind(this);

		this.state = {
			name: '',
			email: ''
		};
	}

	_submit() {
		const { players, updatePlayers, history } = this.props;
		const { name, email } = this.state;
		const newPlayers = [...players];
		const newUser = {
			name,
			email,
			role: null,
			alive: true
		};

		newPlayers.push(newUser);
		updatePlayers(newPlayers);
		history.push('/gameSetup');
	}

	render() {
		return (
			<div>
				<MainHeader />
				<div style={styles.mainContent}>
					<FlexBox direction='row' justify='center'>
						<FlexBox direction='column' style={{ width: '270px' }}>
							<FlexBox direction='row' justify='start' style={{ width: '100%' }}>
								<Header as='h1' > Add Player </Header>
							</FlexBox>
							<br />
							<Input
								style={{ width: '100%' }}
								placeholder='Name'
								value={this.state.name}
								onChange={(event) => { this.setState({ name: event.target.value }); }} />
							<br />
							<Input
								style={{ width: '100%' }}
								placeholder='Email'
								value={this.state.email}
								onChange={(event) => { this.setState({ email: event.target.value }); }} />
							<br />
							<FlexBox style={{ width: '100%' }} direction='row' justify='flex-end'>
								<Button primary onClick={this._submit}> Submit </Button>
								<Button as={Link} to={'/gameSetup'} style={{ margin: 0 }} > Cancel </Button>
							</FlexBox>
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

export default connect(mapStateToProps, actions)(AddPlayer);
