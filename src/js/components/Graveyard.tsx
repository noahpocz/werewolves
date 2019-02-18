import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { Header, Button, Divider } from 'semantic-ui-react'

import FlexBox from './custom/FlexBox'
import MainHeader from './MainHeader'
import PlayerList from './PlayerList'

import { RootState } from '../reducers'

type Props = {
	// Redux State
	morning: boolean
}

class Graveyard extends Component<Props> {
	render() {
		const { morning } = this.props
		return (
			<div style={{ height: window.innerHeight, backgroundColor: morning ? '#FAFAFA' : '#313131' }} >
				<MainHeader inverted={!morning} />
				<div className='main-content' >
					<FlexBox justify='start' align='start' >
						<FlexBox direction='column' align='start'>
							<Header inverted={!morning} as='h1' >
								Graveyard
							</Header>
							<FlexBox direction='row' >
								<Button primary as={Link} to='/gameplay' inverted={!morning} >
									Go Back
								</Button>
							</FlexBox>
						</FlexBox>
					</FlexBox>
					<Divider />
						<PlayerList />
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state: RootState) => ({
	morning: state.gameState.morning
})

export default connect(mapStateToProps, null)(Graveyard)
