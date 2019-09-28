import React from 'react'
import PropTypes from 'prop-types'
import { withRouter, Route } from 'react-router-dom'
import Container from '@material-ui/core/Container'
import { withStyles } from '@material-ui/styles'
import Home from 'containers/Home'
import Posts from 'containers/Posts'
import Post from 'containers/Post'
import NavigationHeader from 'components/layout/NavigationHeader'

const styles = theme => ({
  toolbar: theme.mixins.toolbar
})

const shouldRenderMinimalAppBar = pathname => {
  switch (pathname) {
    case '/':
      return true
    default:
      return false
  }
}

const Content = ({ classes, location }) => <React.Fragment>
  <NavigationHeader minimal={shouldRenderMinimalAppBar(location.pathname)} />
  <Container fixed>
    <div className={classes.toolbar} />
    <Route exact path='/' component={Home} />
    <Route exact path='/blog' component={Posts} />
    <Route path='/blog/:postSlug' component={Post} />
  </Container>
</React.Fragment>

Content.propTypes = {
  classes: PropTypes.object.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
}

export default withRouter(withStyles(styles)(Content))
