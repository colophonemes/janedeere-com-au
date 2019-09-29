import React from 'react'
import PropTypes from 'prop-types'
import { withRouter, Route, Switch } from 'react-router-dom'
import Container from '@material-ui/core/Container'
import { withStyles } from '@material-ui/styles'
import SpacedDivider from 'components/SpacedDivider'

import Home from 'containers/Home'
import About from 'containers/About'
import Posts from 'containers/Posts'
import Post from 'containers/Post'

import NavigationHeader from 'components/layout/NavigationHeader'
import Footer from 'components/layout/Footer'
import FourOhFour from 'containers/404'

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
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/about' component={About} />
      <Route exact path='/blog' component={Posts} />
      <Route path='/blog/:postSlug' component={Post} />
      <Route path='*' component={FourOhFour} />
    </Switch>
    <SpacedDivider spacing={6} />
    <Footer />
  </Container>
</React.Fragment>

Content.propTypes = {
  classes: PropTypes.object.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
}

export default withRouter(withStyles(styles)(Content))
