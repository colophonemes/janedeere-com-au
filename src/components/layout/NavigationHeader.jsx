import React from 'react'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import HomeIcon from '@material-ui/icons/Home'
import StarIcon from '@material-ui/icons/Star'
import { withStyles } from '@material-ui/styles'
import { NavLink, Link as RouterLink } from 'react-router-dom'
import { ReactComponent as LogoType } from 'images/LogoType.svg'
import { ReactComponent as Logo } from 'images/Logo.svg'

import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

const menuItems = [
  {
    href: '/',
    text: 'Home',
    icon: HomeIcon
  },
  {
    href: '/blog',
    text: 'Blog',
    icon: StarIcon
  },
  {
    href: '/about',
    text: 'About',
    icon: StarIcon
  }
]

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  menuButtonFixed: {
    position: 'fixed'
  },
  logoType: {
    paddingTop: 6,
    height: 28
  },
  logo: {
    height: 40,
    margin: theme.spacing(2)
  },
  menuItem: {
    minWidth: 200
  }
})

const Header = ({ classes, minimal }) => {
  const [state, setState] = React.useState({
    menuOpen: false
  })

  const setMenuOpen = menuOpen => setState({ menuOpen })
  const openMenu = () => setMenuOpen(true)
  const closeMenu = () => setMenuOpen(false)

  return <div className={classes.root}>
    {!minimal
      ? <header>
        <AppBar color='default' position="fixed">
          <Toolbar variant="dense">
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={openMenu}>
              <MenuIcon />
            </IconButton>
            <RouterLink to='/'>
              <LogoType preserveAspectRatio='xMidYMid meet' className={classes.logoType} />
            </RouterLink>
          </Toolbar>
        </AppBar>
      </header>
      : <IconButton className={[classes.menuButton, classes.menuButtonFixed].join(' ')} color="inherit" aria-label="menu" onClick={openMenu}>
        <MenuIcon />
      </IconButton>
    }
    <Drawer open={state.menuOpen} onClose={closeMenu}>
      <Logo className={classes.logo} />
      <Divider />
      <List>
        {menuItems.map(({ href, text, icon: Icon }) => <ListItem button key={href} to={href} component={NavLink} onClick={closeMenu} className={classes.menuItem}>
          <ListItemIcon><Icon /></ListItemIcon>
          <ListItemText primary={text} />
        </ListItem>)}
      </List>
    </Drawer>
  </div>
}
Header.propTypes = {
  classes: PropTypes.object.isRequired,
  minimal: PropTypes.bool
}

export default withStyles(styles)(Header)
