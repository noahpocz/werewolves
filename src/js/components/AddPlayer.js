import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Header, Input, Button } from 'semantic-ui-react';
import FlexBox from './custom/FlexBox';

import MainHeader from './MainHeader';

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

	render() {
		return (
			<div>
				<MainHeader />
				<div style={styles.mainContent}>
					<FlexBox direction='row' justify='center'>
						<FlexBox direction='column' style={{ width: '270px' }}>
							<Header as='h1' >
								Add Player
							</Header>
							<Input placeholder='Name' />
							<br />
							<Input placeholder='Email' />
							<br />
							<FlexBox direction='row' justify='flex-end'>
								<Button primary> Submit </Button>
								<Button as={Link} to={'/gameSetup'} style={{ margin: 0 }} > Cancel </Button>
							</FlexBox>
						</FlexBox>
					</FlexBox>
				</div>
			</div>
		);
	}
}

export default AddPlayer;
