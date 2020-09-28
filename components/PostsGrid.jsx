import React from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import PostExcerpt from 'components/PostExcerpt'
import { ContentfulContentQuery } from 'utilities/contentful'

const PostsGrid = ({ items, grid }) => <Grid container spacing={3}>
  {items.map(({ sys, fields }) => <Grid item xs={12} sm={grid ? 6 : 12} key={sys.id}>
    <PostExcerpt {...fields} />
  </Grid>)}
</Grid>

PostsGrid.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      sys: PropTypes.object.isRequired,
      fields: PropTypes.object.isRequired
    })
  ),
  grid: PropTypes.bool
}

const PostsGridWrapper = ({ limit, grid }) =>
  <ContentfulContentQuery
    contentType='post'
    query={{
      order: '-sys.createdAt',
      limit
    }}
    component={props => <PostsGrid {...props} grid={grid} />}
  />

PostsGridWrapper.propTypes = {
  limit: PropTypes.number,
  grid: PropTypes.bool
}

export default PostsGridWrapper
