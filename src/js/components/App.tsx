import React, { Component, ReactElement } from 'react'
import { Switch, withRouter } from 'react-router-dom'

type Props = {
	children: any
	history: any
	location: any
	match: any
}

class App extends Component<Props> {
	render() {
		return (
			<div className='werewolves spooky dog' >
				<Switch>
					{this.props.children}
				</Switch>
			</div>
		)
	}
}

export default withRouter(App)
