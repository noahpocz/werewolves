import React, { Component } from 'react';

import FlexBox from './custom/FlexBox';
import MainHeader from './MainHeader';

class Graveyard extends Component {
	render() {
		return (
			<div>
				<MainHeader />
				<FlexBox>
					Graveyard
				</FlexBox>
			</div>
		);
	}
}

export default Graveyard;
