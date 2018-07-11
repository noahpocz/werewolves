import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Container } from 'semantic-ui-react';

class MainHeader extends Component {
	render() {
		const { inverted } = this.props;
		return (
			<div>
				<Menu inverted={inverted} style={{ borderRadius: '0px', height: '60px',
					paddingLeft: '12px', paddingRight: '12px', backgroundColor: inverted ? '#212121' : '', 
					boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.12)' }} >
					<Container>
						<Menu.Item as={Link} to='/' header>Home</Menu.Item>
						{this.props.children}
					</Container>
				</Menu>
			</div>
		);
	}
}

export default MainHeader;
