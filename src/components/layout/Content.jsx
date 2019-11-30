import React from 'react'
import PropTypes from 'prop-types'
import Container from '@material-ui/core/Container'
import { withRouter, Route, Switch } from 'react-router-dom'
import { withStyles } from '@material-ui/styles'

import Home from 'containers/Home'
import Page from 'containers/Page'
import Posts from 'containers/Posts'
import Post from 'containers/Post'
import { omit } from 'lodash'
import NavigationHeader from 'components/layout/NavigationHeader'
import Footer from 'components/layout/Footer'
import FourOhFour from 'containers/404'

const styles = theme => ({
  toolbar: theme.mixins.toolbar
})

const RouteWrapper = props => {
  const componentProps = omit(props, ['noContainer'])
  if (props.noContainer) return <Route {...componentProps} />
  return <Container><Route {...componentProps} /></Container>
}

RouteWrapper.propTypes = {
  noContainer: PropTypes.bool
}

// const shouldRenderMinimalAppBar = pathname => {
//   switch (pathname) {
//     case '/':
//       return true
//     default:
//       return false
//   }
// }

const Content = ({ classes, location }) => <React.Fragment>
  <NavigationHeader minimal={false} />
  <div className={classes.toolbar} />
  <Switch>
    <Route exact path='/' component={Home} noContainer />
    <Route exact path='/blog' component={Posts} />
    <Route path='/blog/:postSlug' component={Post} />
    <Route path='/:slug' component={Page} noContainer />
    <Route path='*' component={FourOhFour} />
  </Switch>
  <Footer />
</React.Fragment>

Content.propTypes = {
  classes: PropTypes.object.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
}

export default withRouter(withStyles(styles)(Content))
