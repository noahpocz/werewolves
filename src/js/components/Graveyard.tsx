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
			<div className={morning ? 'app' : 'app--night'} >
				<MainHeader inverted={!morning} />
				<div className='main-content' >
					<FlexBox direction='column' align='start' className='title-header' >
						<Header inverted={!morning} as='h1' >
							Graveyard
						</Header>
						<FlexBox direction='row' >
							<Button
								primary
								as={Link}
								to='/gameplay'
								inverted={!morning}
								className={morning ? '' : 'button--dark'}
							>
								Go Back
							</Button>
						</FlexBox>
						<Divider className='title-header__divider' />
					</FlexBox>
					<div>
						<PlayerList />
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state: RootState) => ({
	morning: state.gameState.morning
})

export default connect(mapStateToProps, null)(Graveyard)
