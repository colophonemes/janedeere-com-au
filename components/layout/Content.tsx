import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'

import NavigationHeader from 'components/layout/NavigationHeader'
import Footer from 'components/layout/Footer'

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  content: {
    alignContent: 'flex-start',
    flex: '1 0 auto',
  },
  footer: {
    flexShrink: 0,
  },
}))

const Content: React.FC = ({ children }) => {
  const classes = useStyles()
  return (
    <>
      <NavigationHeader />
      <div className={classes.wrapper}>
        <div className={classes.content}>
          <div className={classes.toolbar} />
          {children}
        </div>
        <div className={classes.footer}>
          <Footer />
        </div>
      </div>
    </>
  )
}

export default Content
