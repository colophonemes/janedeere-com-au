import React from 'react'
import PropTypes from 'prop-types'
import { ContentfulContentQuery } from 'utilities/contentful'

import Grid from '@material-ui/core/Grid'
import PostContent from 'components/PostContent'
import SpacedDivider from 'components/SpacedDivider'
import Commento from 'components/Commento'
import Typography from '@material-ui/core/Typography'

const PostContentWrapper = ({ sys, fields }) => <React.Fragment>
  <Grid container justify='center' spacing={3}>
    <Grid item xs={12} md={8}>
      <PostContent key={sys.id} {...{ sys, fields }} />
    </Grid>
  </Grid>
  <Grid container justify='center' spacing={3}>
    <Grid item xs={12} md={8}>
      <SpacedDivider />
      <Typography variant='h4' gutterBottom>Comments</Typography>
      <Commento id={sys.id} />
    </Grid>
  </Grid>
</React.Fragment>
PostContentWrapper.propTypes = {
  sys: PropTypes.object.isRequired,
  fields: PropTypes.object.isRequired
}

const Post = ({ match }) => <React.Fragment>
  <ContentfulContentQuery
    contentType='post'
    query={{ 'fields.slug': match.params.postSlug }}
    component={PostContentWrapper}
    single
  />
</React.Fragment>

Post.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      postSlug: PropTypes.string
    }).isRequired
  }).isRequired
}

export default Post
