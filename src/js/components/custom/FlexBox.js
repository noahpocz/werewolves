import React, { Component } from 'react';

const defaultAttributes = {
	direction: 'column',
	justify: 'start',
	align: 'center',
	wrap: true
};

const mapping = {
	start: 'flex-start',
	end: 'flex-end',
	between: 'space-between',
};

const map = (input) => {
	if (input in mapping) {
		return mapping[input];
	}
	return input;
};

class FlexBox extends Component {
	render() {
		let { direction, justify, align, wrap } = this.props;
		/* Sets defaults if prop is undefined */
		direction = map(direction) || defaultAttributes.direction;
		justify = map(justify) || defaultAttributes.justify;
		align = map(align) || defaultAttributes.align;
		wrap = wrap !== undefined ? wrap : defaultAttributes.wrap;

		/* Merges props with style object */
		const finalStyling = Object.assign({ display: 'flex' }, this.props.style);
		finalStyling.flexDirection = direction;
		finalStyling.justifyContent = justify;
		finalStyling.alignItems = align;
		finalStyling.flexWrap = wrap ? 'wrap' : 'nowrap';
		return (
			<div style={finalStyling}>
				{this.props.children}
			</div>
		);
	}
}

export default FlexBox;
