import React from 'react'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'

export default function Header () {
	return (
		<div>
			<AppBar position='static' color='primary'>
				<Toolbar>
					<Typography type='title'>这是标题</Typography>
				</Toolbar>
			</AppBar>
		</div>
	)
}

