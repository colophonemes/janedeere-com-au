import React from 'react'
import PropTypes from 'prop-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { ContentfulContentQuery, rendererConfig } from 'utilities/contentful'

import Grid from '@material-ui/core/Grid'
import { ReactComponent as LogoPlusLogoType } from 'images/Logo + LogoType.svg'
import { withStyles } from '@material-ui/styles'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'

const styles = theme => ({
  logoPlusLogoTypeContainer: {
    textAlign: 'center'
  },
  logoPlusLogoType: {
    display: 'flex',
    margin: `${theme.spacing(2)}px auto ${theme.spacing(12)}px`,
    height: 200
  }
})

const HomeContent = ({ fields: { body } }) => <React.Fragment>
  {documentToReactComponents(body, rendererConfig)}
</React.Fragment>

const Home = ({ classes }) => <React.Fragment>
  <Grid container justify='center'>
    <Grid item xs={12} className={classes.logoPlusLogoTypeContainer}>
      <LogoPlusLogoType className={classes.logoPlusLogoType} />
    </Grid>
    <Grid item xs={12}>
      <ContentfulContentQuery
        contentType='page'
        query={{ 'fields.slug': 'home' }}
        component={HomeContent}
        single
      />
    </Grid>
  </Grid>
  <Grid
    container
    direction='row'
    justify='center'
    alignItems='center'
    spacing={3}
  >
    <Divider />
    <Grid item>
      <Typography paragraph align='center'><em>Recent blog posts will display here...</em></Typography>
    </Grid>

  </Grid>
</React.Fragment>

Home.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Home)
