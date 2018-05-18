import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Menu } from 'semantic-ui-react';

class MainHeader extends Component {
	render() {
		return (
			<div>
				<Menu inverted style={{ borderRadius: '0px', height: '60px', paddingLeft: '12px', paddingRight: '12px' }} >
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
