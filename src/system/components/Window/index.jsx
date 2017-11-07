import React from 'react'
import styles from './index.sass'
import { createPortal } from 'react-dom'
import getEventPosition from '_utils/getEventPosition'
import getEventRelativePosition from '_utils/getEventRelativePosition'

const CURSOR_RANGE = 4

class Window extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      left:100,
      top: 100,
      width: 600,
      height: 400,
      // 0 normal, 1 topLeft, 2 bottomRight, 3 bottomLeft, 4 topRight, 5 left, 6 right, 7 top, 8 bottom
      cursor: 0,
      active: true,
      // 0 normal, 1 draging, 2 show resize cursor, 3 resizing
      status: 0
    }
  }

  static defaultProps = {
    onRequestClose: () => {}
  }

  componentDidMount () {
    document.addEventListener('mousemove', this.handleMouseMove)
  }

  handleMouseMove = e => {
    let {status} = this.state
    if (status !== 0 && status !== 2) {
      return
    }
    let w = this.refs.window
    let r = w.getBoundingClientRect()
    let left = r.left - window.pageXOffset
    let top = r.top - window.pageYOffset
    let right = left + w.clientWidth
    let bottom = top + w.clientHeight
    let range = CURSOR_RANGE 
    let p = getEventPosition(e)
    let l = p.left
    let t = p.top
    let inLeft = l >= left - range && l <= left + range && t >= top - range && t <= bottom + range
    let inTop = t >= top - range && t <= top + range && l >= left - range && l <= right + range
    let inRight = l >= right - range && l <= right + range && t >= top - range && t <= bottom + range
    let inBottom = t >= bottom - range && t <= bottom + range && l >= left - range && l <= right + range

    if (inLeft && inTop) {
      return this.setState({cursor: 1, status: 2})
    }

    if (inRight && inBottom) {
      return this.setState({cursor: 2, status: 2})
    }

    if (inLeft && inBottom) {
      return this.setState({cursor: 3, status: 2})
    }

    if (inRight && inTop) {
      return this.setState({cursor: 4, status: 2})
    }

    if (inLeft) {
      return this.setState({cursor: 5, status: 2})
    }

    if (inRight) {
      return this.setState({cursor: 6, status: 2})
    }

    if (inTop) {
      return this.setState({cursor: 7, status: 2})
    }

    if (inBottom) {
      return this.setState({cursor: 8, status: 2})
    }

    this.setState({cursor: 0, status: 0})
  }

  // resize
  handleBoundaryMouseDown = e => {
    let { status } = this.state
    if (status !== 2 && status !== 3) {
      return
    }
    
    this.setState({status: 3})
    this.lastPosition = getEventPosition(e)
    document.addEventListener('mousemove', this.handleResize)
    document.addEventListener('touchmove', this.handleResize)
    document.addEventListener('mouseup', this.removeResizeListener)
    document.addEventListener('touchend', this.removeResizeListener)
  }

  handleResize = e => {
    let { cursor, left, top, width, height } = this.state
    let o = this.lastPosition
    let n = getEventPosition(e)
    let offsetX = n.left - o.left
    let offsetY = n.top - o.top
    this.lastPosition = n
    if (cursor === 1) {
      return this.setState({
        left: left + offsetX,
        top: top + offsetY,
        width: width - offsetX,
        height: height - offsetY
      })
    }
    if (cursor === 2) {
      return this.setState({
        width: width + offsetX,
        height: height + offsetY
      })
    }
    if (cursor === 3) {
      return this.setState({
        left: left + offsetX,
        width: width - offsetX,
        height: height + offsetY
      })
    }
    if (cursor === 4) {
      return this.setState({
        top: top + offsetY,
        width: width + offsetX,
        height: height - offsetY
      })
    }
    if (cursor === 5) {
      return this.setState({
        left: left + offsetX,
        width: width - offsetX
      })
    }
    if (cursor === 6) {
      return this.setState({
        width: width + offsetX
      })
    }
    if (cursor === 7) {
      return this.setState({
        top: top + offsetY,
        height: height - offsetY
      })
    }
    if (cursor === 8) {
      return this.setState({
        height: height + offsetY
      })
    }
  }

  removeResizeListener = () => {
    this.setState({status: 2})
    document.removeEventListener('mousemove', this.handleResize)
    document.removeEventListener('touchmove', this.handleResize)
    document.removeEventListener('mouseup', this.removeResizeListener)
    document.removeEventListener('touchend', this.removeResizeListener)
  }

  // close
  close = () => {
    this.props.onRequestClose()
  }

  // drag
  handleToolbarMouseDown = e => {
    let target = e.target
    let { status } = this.state
    if (status !== 0 && status !== 1) {
      return
    }
    if (target !== this.refs.toolbar) {
      return
    }
    this.setState({status: 1})
    this.dragOffset = getEventRelativePosition(e, this.refs.toolbar)
    document.addEventListener('mousemove', this.handleDrag)
    document.addEventListener('touchmove', this.handleDrag)
    document.addEventListener('mouseup', this.removeDragListener)
    document.addEventListener('touchend', this.removeDragListener)
  }

  handleDrag = e => {
    e.preventDefault()
    let p = getEventPosition(e)
    this.setState({
      left: p.left - this.dragOffset.left,
      top: p.top - this.dragOffset.top
    })
  }

  removeDragListener = () => {
    this.setState({status: 0})
    document.removeEventListener('mousemove', this.handleDrag)
    document.removeEventListener('touchmove', this.handleDrag)
    document.removeEventListener('mouseup', this.handleDrag)
    document.removeEventListener('touchend', this.handleDrag)
  }

  render () {
    let { left, top, width, height, cursor } = this.state
    cursor = cursor > 0 ? ['nwse','nesw','ew','ns'][(cursor - 1) / 2 >> 0] + '-resize' : 'default'
    // display cursor, event in out of window
    document.body.style.cursor = cursor
    
    // render to root node
    return createPortal((
      <div 
        className={styles['window']} 
        style={{left, top, width, height, padding: CURSOR_RANGE}}
        onMouseDown={this.handleBoundaryMouseDown}
        onMouseLeave={this.handleMouseLeave}
      >
        <div className={styles['window-inner']} ref='window' >
          <div className={styles['window-toolbar']} ref='toolbar' onMouseDown={this.handleToolbarMouseDown} onTouchStart={this.handleToolbarMouseDown}>
            <span onClick={this.close}>X</span>
            <span onClick={this.minimize}>-</span>
            <span onClick={this.maximize}>+</span>
          </div>
          <div className={styles['window-content']}>{ this.props.children }</div>
        </div>
      </div>
    ), document.body)
  }
}

export default Window