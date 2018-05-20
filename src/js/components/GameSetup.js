import React, { Component } from 'react';
import { Segment, Label, Icon } from 'semantic-ui-react';

import { players1 } from './mockdata';

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

class GameSetup extends Component {
	render() {
		const renderPlayers = () => {
			return players1.map((player, i) => {
				console.log('player: ', player);
				return (
					<Segment key={i} >
						<div style={styles.flexBox} >
							{player.name}
							<div style={styles.flexBox} >
								<Label style={{ marginRight: '12px' }} >
									{player.role || 'Unassigned'}
								</Label>
								<Icon name='ellipsis vertical' size='large' />
							</div>
						</div>
					</Segment>
				);
			});
		};
		return (
			<div style={styles.mainContent} >
				{renderPlayers()}
			</div>
		);
	}
}

export default GameSetup;
