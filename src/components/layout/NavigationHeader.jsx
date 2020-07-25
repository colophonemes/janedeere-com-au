import React from 'react'
import PropTypes from 'prop-types'
import Container from '@material-ui/core/Container'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import FacebookIcon from '@material-ui/icons/Facebook'
import InstagramIcon from '@material-ui/icons/Instagram'
// import HomeIcon from '@material-ui/icons/Home'
import StarIcon from '@material-ui/icons/Star'
import { withStyles, useTheme } from '@material-ui/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { ButtonLink } from 'components/Link'
import { NavLink, Link as RouterLink } from 'react-router-dom'
import LogoType from 'images/Logotype.png'
import LogotypeVertical from 'images/Logotype Vertical.png'

import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
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
    text: 'About Jane',
    icon: StarIcon
  },
  {
    href: '/my-philosophy',
    text: 'My Philosophy',
    icon: StarIcon
  },
  {
    href: '/faq',
    text: 'FAQ',
    icon: StarIcon
  },
  {
    href: '/pricing',
    text: 'Pricing',
    icon: StarIcon
  },
  {
    href: '/contact',
    text: 'Contact',
    icon: StarIcon
  },
  {
    href: 'https://www.facebook.com/janedeerecoaching/',
    text: 'Facebook',
    icon: FacebookIcon
  },
  {
    href: 'https://www.instagram.com/jane_deere_coaching/',
    text: 'Instagram',
    icon: InstagramIcon
  }
]

const isExternalLink = href => /^https?:\/\//.test(href)

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  toolbarButtons: {
    marginLeft: 'auto',
    '& .MuiButton-label': {
      fontWeight: 400
    }
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
    width: 120,
    margin: `${theme.spacing(2)}px auto`
  },
  menuItem: {
    minWidth: 200
  },
  iconListItem: {
    textAlign: 'center'
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
  const largeMenu = useMediaQuery(theme.breakpoints.up('sm'))
  console.log(largeMenu, 'largeMenu')

  const setMenuOpen = menuOpen => setState({ menuOpen })
  const openMenu = () => setMenuOpen(true)
  const closeMenu = () => setMenuOpen(false)

  return <div className={classes.root}>
    <header>
      <AppBar color='default' position="fixed">
        <Container>
          <Toolbar variant="regular">
            <RouterLink to='/'>
              <img alt='Logo' src={LogoType} className={classes.logoType} />
            </RouterLink>
            <div className={classes.toolbarButtons}>
              {largeMenu
                ? menuItems.map(({ href, text, icon: Icon, iconOnly }) => isExternalLink(href)
                  ? <IconButton key={href} href={href} target='_blank' rel='noopener noreferrer'><Icon /></IconButton>
                  : <ButtonLink key={href} to={href} className={classes.largeMenuItem}>{text}</ButtonLink>)
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
      <img alt='Logo' src={LogotypeVertical} className={classes.logo} />
      <Divider />
      <List>
        {menuItems.map(({ href, text, icon: Icon, iconOnly }) => isExternalLink(href)
          ? <li key={href} className={classes.iconListItem}>
            <IconButton key={href} href={href} target='_blank' rel='noopener noreferrer'>
              <Icon />
            </IconButton>
          </li>
          : <ListItem
            button
            key={href}
            to={href}
            component={NavLink}
            onClick={closeMenu}
            className={classes.menuItem}
          >
            <ListItemText primary={text} className={classes.drawerMenuItem} />
          </ListItem>)
        }
      </List>
    </Drawer>
  </div>
}
Header.propTypes = {
  classes: PropTypes.object.isRequired,
  minimal: PropTypes.bool
}

export default withStyles(styles)(Header)
