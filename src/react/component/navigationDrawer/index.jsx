import React from 'react'
import style from './index.sass'
import Drawer from 'material-ui/Drawer'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import Divider from 'material-ui/Divider'

function NavigationDrawer () {

	return (
		<div className={ style['navigation-drawer'] }>
			<Drawer classes={{ paper: style['drawer'] }} type='permanent'>
				<div className={ style['title'] }>Title</div>
				<Divider />
				<List className={ style['list'] }>
					<ListItem button>
						<ListItemIcon>
							<span className='icon-technology' style={{fontSize: '18px', color: '#fff'}}></span>
						</ListItemIcon>
						<ListItemText primary='技术博客' />
					</ListItem>
					<ListItem button>
						<ListItemIcon>
							<span className='icon-life' style={{fontSize: '18px', color: '#fff'}}></span>
						</ListItemIcon>
						<ListItemText primary='生活博客' />
					</ListItem>
					<ListItem button>
						<ListItemIcon>
							<span className='icon-works' style={{fontSize: '18px', color: '#fff'}}></span>
						</ListItemIcon>
						<ListItemText primary='作品' />
					</ListItem>
					<ListItem button>
						<ListItemIcon>
							<span className='icon-medal' style={{fontSize: '18px', color: '#fff'}}></span>
						</ListItemIcon>
						<ListItemText primary='最佳' />
					</ListItem>
				</List>
			</Drawer>
		</div>
	)
}

export default NavigationDrawer