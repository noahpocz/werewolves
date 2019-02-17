import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Container } from 'semantic-ui-react'

const CLASS_ROOT = 'main-header'

type Props = {
	inverted?: boolean
}

class MainHeader extends Component<Props> {
	render() {
		const { inverted } = this.props
		return (
			<div>
				<Menu inverted={inverted} className={CLASS_ROOT} >
					<Container>
						<Menu.Item as={Link} to='/' header>Home</Menu.Item>
						{this.props.children}
					</Container>
				</Menu>
			</div>
		)
	}
}

export default MainHeader
