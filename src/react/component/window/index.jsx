import React from 'react'

class Window extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			left: 0,
			top: 0,
			width: 0,
			height: 0,
			zIndex: 0,
			active: false,
			hide: false
		}
	}

	render () {
		let {
			left,
			top,
			width,
			height,
			zIndex
		} = this.props

		let style = {
			width: 1
		}

		return (
			<div></div>
		)
	}
}

export default Window