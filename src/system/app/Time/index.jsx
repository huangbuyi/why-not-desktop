import React from 'react'
import styles from './index.sass'
import ButtonBase from 'material-ui/Button'
import Menu, { MenuItem } from 'material-ui/Menu'
import Window from '_system/components/Window'

const data = `Even though a portal can be anywhere in the DOM tree, it behaves like a normal React child in every other way. Features like context work exactly the same regardless of whether the child is a portal, as the portal still exists in the React tree regardless of position in the DOM tree.
This includes event bubbling. An event fired from inside a portal will propagate to ancestors in the containing React tree, even if those elements are not ancestors in the DOM tree. Assuming the following HTML structure:Even though a portal can be anywhere in the DOM tree, it behaves like a normal React child in every other way. Features like context work exactly the same regardless of whether the child is a portal, as the portal still exists in the React tree regardless of position in the DOM tree.
This includes event bubbling. An event fired from inside a portal will propagate to ancestors in the containing React tree, even if those elements are not ancestors in the DOM tree. Assuming the following HTML structure:Even though a portal can be anywhere in the DOM tree, it behaves like a normal React child in every other way. Features like context work exactly the same regardless of whether the child is a portal, as the portal still exists in the React tree regardless of position in the DOM tree.
This includes event bubbling. An event fired from inside a portal will propagate to ancestors in the containing React tree, even if those elements are not ancestors in the DOM tree. Assuming the following HTML structure:`

const formatTime = date => {
  let ss = date.getSeconds(),
      mm = date.getMinutes(),
      hh = date.getHours(),
      d = ['Mon','Tues','Wed','Thur','Fri','Sat','Sun'][date.getDay() - 1],
      p = hh < 12 ? 'AM' : 'PM'
  
  ss = ss < 10 ? '0' + ss : ss
  mm = mm < 10 ? '0' + mm : mm
  return d + ' ' + hh + ':' + mm + ':' + ss + ' ' + p
}

class Time extends React.Component {
  constructor (props) {
    super(props)
    this.state = Object.assign({
      open: false,
      openSetting: false,
      display: 'time',
      timeText: ''
    }, props)
    this.anchorEl = null
  }

  componentWillMount () {
    this.startupTimer()
  }

  handleClick = e => {
    this.setState({open: true})
    this.anchorEl = e.currentTarget
  }

  switchToDate = () => {
    this.setState({ display: 'date' })
    this.closeMenu()
  }

  switchToTime = () => {
    this.setState({ display: 'time' })
    this.closeMenu()
  }

  openSetting = () => {
    this.setState({ openSetting: true })
    this.closeMenu()
  }

  closeSetting = () => {
    this.setState({ openSetting: false })
  }

  closeMenu = () => {
    this.setState({ open: false })
  }

  startupTimer = () => {
    let o = new Date()
    this.timer = setInterval(() => {
      let n = new Date()
      if (n.getTime() - o.getTime() >= 1000) {
        this.setState({timeText: formatTime(n)})
        o = n
      }
    }, 200)
  }

  render () {
    let {open, openSetting, display, timeText} = this.state

    return (
      <div className={styles['time']}>
        <ButtonBase
          onClick={this.handleClick}
          style={{
            height: '100%',
            padding: '0 12px',
            minHeight: 0,
            textTransform: 'none',
            color: 'rgba(0,0,0,0.68)',
            fontFamily: '"Roboto Mono"'
          }}
        >
          { timeText }
        </ButtonBase>
        <Menu
          anchorEl={this.anchorEl}
          open={open}
          onRequestClose={this.closeMenu}
          MenuListProps={{
            style: {
              paddingTop: 4,
              paddingBottom: 4
            }
          }}
          onChange={(a) => console.log(a) }
        >
          <MenuItem 
            style={{padding:'0 20px',fontSize:14}} 
            onClick={this.switchToTime}
            selected={display === 'time'}
          >显示时间</MenuItem>
          <MenuItem 
            style={{padding:'0 20px',fontSize:14}} 
            onClick={this.switchToDate}
            selected={display === 'date'}
          >显示日期</MenuItem>
          <MenuItem 
            style={{padding:'0 20px',fontSize:14}} 
            onClick={this.openSetting}
          >设置</MenuItem>
        </Menu>
        {
          openSetting ? 
            <Window onRequestClose={this.closeSetting}>{data}</Window> 
            : null
        }
      </div>
    )
  }
}

export default Time