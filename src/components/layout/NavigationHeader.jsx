import React from 'react'
import PropTypes from 'prop-types'
import Container from '@material-ui/core/Container'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
// import HomeIcon from '@material-ui/icons/Home'
import StarIcon from '@material-ui/icons/Star'
import { withStyles, useTheme } from '@material-ui/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { ButtonLink } from 'components/Link'
import { NavLink, Link as RouterLink } from 'react-router-dom'
import { ReactComponent as Logotype } from 'images/Logotype.svg'
import { ReactComponent as LogotypeVertical } from 'images/Logotype Vertical.svg'

import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
// import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

const menuItems = [
  // {
  //   href: '/',
  //   text: 'Home',
  //   icon: HomeIcon
  // },
  {
    href: '/services',
    text: 'Services',
    icon: StarIcon
  },
  {
    href: '/about',
    text: 'About',
    icon: StarIcon
  },
  {
    href: '/contact',
    text: 'Contact',
    icon: StarIcon
  }

]

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  toolbarButtons: {
    marginLeft: 'auto'
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
  },
  drawerMenuItem: {
    textAlign: 'center'
  },
  largeMenuItem: {}
})

const Header = ({ classes, minimal }) => {
  const [state, setState] = React.useState({
    menuOpen: false
  })

  const theme = useTheme()
  const largeMenu = useMediaQuery(theme.breakpoints.up(menuItems.length > 4 ? 'md' :'sm'))

  const setMenuOpen = menuOpen => setState({ menuOpen })
  const openMenu = () => setMenuOpen(true)
  const closeMenu = () => setMenuOpen(false)

  return <div className={classes.root}>
    <header>
      <AppBar color='default' position="fixed">
        <Container>
          <Toolbar variant="regular">
            <RouterLink to='/'>
              <Logotype preserveAspectRatio='xMidYMid meet' className={classes.logoType} />
            </RouterLink>
            <div className={classes.toolbarButtons}>
              {largeMenu
                ? menuItems.map(({ href, text, icon: Icon }) => <ButtonLink key={href} to={href} className={classes.largeMenuItem}>{text}</ButtonLink>)
                : <IconButton edge="end" className={classes.menuButton} color="inherit" aria-label="menu" onClick={openMenu}>
                  <MenuIcon />
                </IconButton>
              }
            </div>
          </Toolbar>
        </Container>
      </AppBar>
    </header>
    <Drawer open={state.menuOpen} onClose={closeMenu} anchor='right'>
      <LogotypeVertical className={classes.logo} />
      <Divider />
      <List>
        {menuItems.map(({ href, text, icon: Icon }) => <ListItem
          button
          key={href}
          to={href}
          component={NavLink}
          onClick={closeMenu}
          className={classes.menuItem}
        >
          {/* <ListItemIcon><Icon /></ListItemIcon> */}
          <ListItemText primary={text} className={classes.drawerMenuItem} />
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
