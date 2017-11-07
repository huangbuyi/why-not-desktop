import React from 'react'
import styles from './index.sass'
import MenuBar from './components/MenuBar'
import DockBar from './components/DockBar'
import {MuiThemeProvider, createMuiTheme} from 'material-ui/styles/'

const muiTheme = createMuiTheme({
  overrides: {
    MuiButtonBase: {
      root: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
      }
    }
  }  
})

class System extends React.Component {

  render () {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className={styles['menu-bar']}>
          <MenuBar/>
        </div>
        <div className={styles['dock-bar']}>
          <DockBar/>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default System