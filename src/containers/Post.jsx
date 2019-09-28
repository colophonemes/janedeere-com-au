import React from 'react'
import PropTypes from 'prop-types'
import { ContentfulContentQuery } from 'utilities/contentful'

import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import PostContent from 'components/PostContent'
import Link from 'components/Link'

const PostContentWrapper = ({ sys, fields }) => <Grid container spacing={3}>
  <Grid item xs={12}>
    <Link to={'/blog'}>Blog</Link>
    <Divider />
  </Grid>
  <Grid item xs={12}>
    <PostContent key={sys.id} {...{sys, fields}} />
  </Grid>
  <Grid item xs={12}>
    <Divider />
  </Grid>
</Grid>

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
