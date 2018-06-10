import React, { Component } from 'react';

class FlexBox extends Component {

	render() {

		const defaultAttributes = {
			flexDirection: 'column',
			justifyContent: 'start'
		};

		const { direction, justify } = this.props;
		const finalStyling = Object.assign({ display: 'flex' }, this.props.style);

		if (direction) {
			finalStyling.flexDirection = direction;
		}

		if (justify) {
			finalStyling.justifyContent = justify;
		}

		return (
			<div style={finalStyling}>
				{this.props.children}
			</div>
		);
	}
}

export default FlexBox;
