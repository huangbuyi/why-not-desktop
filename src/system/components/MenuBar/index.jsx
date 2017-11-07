import React from 'react'
import styles from './index.sass'
import Time from '_system/app/Time'

console.log(styles)

class MenuBar extends React.Component {

  render () {

    return (
      <div className={styles['menu-bar']}>
        <div className={styles['menu']}>
          MenuBar
        </div>
        <div className={styles['background']}>
          <Time/>
        </div>
      </div>
    )
  }
}

export default MenuBar