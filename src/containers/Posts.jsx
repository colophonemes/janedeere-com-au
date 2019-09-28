import React from 'react'
import PropTypes from 'prop-types'
import { ContentfulContentQuery } from 'utilities/contentful'
import Grid from '@material-ui/core/Grid'
import PostExcerpt from 'components/PostExcerpt'
import Container from '@material-ui/core/Container'

const PostsGrid = ({ items }) => <Grid container spacing={3}>
  {items.map(item => <Grid item xs={12} key={item.sys.id}>
    <PostExcerpt {...item.fields} />
  </Grid>)}
</Grid>

PostsGrid.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      sys: PropTypes.object.isRequired,
      fields: PropTypes.object.isRequired
    })
  )
}

const Posts = props => <Container>
  <ContentfulContentQuery
    contentType='post'
    query={{
      order: '-sys.createdAt'
    }}
    component={PostsGrid}
  />
</Container>

export default Posts
