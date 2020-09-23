import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'

import NavigationHeader from 'components/layout/NavigationHeader'
import Footer from 'components/layout/Footer'

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
}))

const Content: React.FC = ({ children }) => {
  const classes = useStyles()
  return (
    <>
      <NavigationHeader minimal={false} />
      <div className={classes.toolbar} />
      {children}
      <Footer />
    </>
  )
}

Content.propTypes = {
  classes: PropTypes.object.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
}

export default Content
