import React, { Component } from 'react';
import { Switch, withRouter } from 'react-router-dom';

class App extends Component {
	render() {
		return (
			<div>
				<Switch>
					{this.props.children}
				</Switch>
			</div>
		);
	}
}

export default withRouter(App);
