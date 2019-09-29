import React from 'react'
import PropTypes from 'prop-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { ContentfulContentQuery, rendererConfig } from 'utilities/contentful'

import Grid from '@material-ui/core/Grid'
import { ReactComponent as LogoPlusLogoType } from 'images/Logo + LogoType.svg'
import { withStyles } from '@material-ui/styles'
// import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import PostsGrid from 'components/PostsGrid'
import { ButtonLink } from 'components/Link'

const HomeContent = ({ fields: { body } }) => <React.Fragment>
  {documentToReactComponents(body, rendererConfig)}
</React.Fragment>

HomeContent.propTypes = {
  fields: PropTypes.shape({
    body: PropTypes.object.isRequired
  }).isRequired
}

const styles = theme => ({
  logoPlusLogoTypeContainer: {
    textAlign: 'center'
  },
  logoPlusLogoType: {
    display: 'flex',
    margin: `${theme.spacing(2)}px auto ${theme.spacing(12)}px`,
    height: 200
  },
  homeContentWrapper: {
    marginBottom: theme.spacing(12),
    '& p': {
      textAlign: 'center'
    }
  }
})

const Home = ({ classes }) => <React.Fragment>
  <Grid container justify='center'>
    <Grid item xs={12} className={classes.logoPlusLogoTypeContainer}>
      <LogoPlusLogoType className={classes.logoPlusLogoType} />
    </Grid>
    </Grid>
  <Grid container justify='center' className={classes.homeContentWrapper}>
    <Grid item xs={12} sm={8} md={6}>
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
    <Grid item xs={12}>
      <PostsGrid limit={6} grid />
    </Grid>
    <Grid item xs={12}>
      <Grid container justify='center'>
        <Grid item xs={12} sm={6}>
          <ButtonLink fullWidth variant='outlined' color='primary' to='/blog'>More Posts</ButtonLink>
        </Grid>
      </Grid>
    </Grid>
  </Grid>
</React.Fragment>

Home.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Home)
