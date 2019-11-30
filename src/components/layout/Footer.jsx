import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'

import { SITE_TITLE } from 'siteGlobals'

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.grey[700],
    padding: theme.spacing(6),
    color: 'white'
  }
}))

const Footer = () => {
  const classes = useStyles()
  return <footer className={classes.root}>
    <Grid container spacing={4} justify='center'>
      <Grid item xs={12}><Typography align='center'>© {SITE_TITLE} 2019</Typography></Grid>
    </Grid>
  </footer>
}

export default Footer
