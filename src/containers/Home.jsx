import React from 'react'
import PropTypes from 'prop-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { ContentfulContentQuery, rendererConfig } from 'utilities/contentful'

import { withStyles } from '@material-ui/styles'
import HeadTags from 'components/layout/HeadTags'

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
    height: 200,
    width: 'auto',
    maxWidth: '100%'
  },
  homeContentWrapper: {
    marginBottom: theme.spacing(12),
    '& p': {
      textAlign: 'center'
    }
  }
})

const Home = ({ classes }) => <React.Fragment>
  <HeadTags title={'Transitional Coaching'} />
  <ContentfulContentQuery
    contentType='page'
    query={{ 'fields.slug': 'home' }}
    component={HomeContent}
    single
  />
</React.Fragment>

Home.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Home)
