import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { Header, Input, Button, Message } from 'semantic-ui-react'
import FlexBox from './custom/FlexBox'

import MainHeader from './MainHeader'

import { Players, Player } from '../model/player'

import * as actions from '../actions'
import { RootState } from '../reducers'

function isEmpty(str: string) {
	const trimmed = str.trim()
	return (!trimmed || 0 === trimmed.length)
}

type Props = {
	players: Players
	history: any
	updatePlayers: typeof actions.updatePlayers
}

type State = {
	name: string
	email: string
	error: string
}

class AddPlayer extends Component<Props, State> {
	constructor(props: Props) {
		super(props)

		this.state = {
			name: '',
			email: '',
			error: ''
		}
	}

	_submit = () => {
		const { players, updatePlayers, history } = this.props
		const { name, email } = this.state
		const newPlayers = [...players]
		if (newPlayers.some(p => p.name === name)) {
			this.setState({ error: 'That name is taken!' })
			return
		}
		const newUser: Player = {
			name: name.trim(),
			email: email.trim(),
			role: undefined,
			charmed: false,
			alive: true,
			sheriff: false,
			lover: false
		}

		newPlayers.push(newUser)
		updatePlayers(newPlayers)
		history.push('/gameSetup')
	}

	_buttonDisabled = () => {
		const { name, email } = this.state
		return isEmpty(name) || isEmpty(email)
	}

	render() {
		const { error } = this.state
		const errorMessage = () => {
			if (!error) return null
			return (
				<FlexBox align='center' margin='medium' >
					<Message negative className='message' >
						<Message.Header>{error}</Message.Header>
					</Message>
				</FlexBox>
			)
		}
		return (
			<div>
				<MainHeader />
				<div className='main-content' >
					{errorMessage()}
					<FlexBox direction='row' justify='center'>
						<FlexBox direction='column' style={{ width: '270px' }}>
							<FlexBox direction='row' justify='start' style={{ width: '100%' }}>
								<Header as='h1' >Add Player</Header>
							</FlexBox>
							<br />
							<Input
								style={{ width: '100%' }}
								placeholder='Name'
								value={this.state.name}
								onChange={(event) => { this.setState({ name: event.target.value }) }} />
							<br />
							<Input
								style={{ width: '100%' }}
								placeholder='Email'
								value={this.state.email}
								onChange={(event) => { this.setState({ email: event.target.value }) }} />
							<br />
							<FlexBox style={{ width: '100%' }} direction='row' justify='end'>
								<Button primary disabled={this._buttonDisabled()} onClick={this._submit}>Submit</Button>
								<Button as={Link} to={'/gameSetup'} style={{ margin: 0 }} >Cancel</Button>
							</FlexBox>
						</FlexBox>
					</FlexBox>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state: RootState) => ({
	players: state.players.players
})

const actionCreators = {
	updatePlayers: actions.updatePlayers
}

export default connect(mapStateToProps, actionCreators)(AddPlayer)
