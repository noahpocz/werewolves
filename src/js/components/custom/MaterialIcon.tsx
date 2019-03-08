import React, { Component } from 'react'

type Props = {
	name: string
}

class MaterialIcon extends Component<Props> {
	render() {
		const { name } = this.props
		return (
			<i className='material-icons' >{name}</i>
		)
	}
}

export default MaterialIcon
