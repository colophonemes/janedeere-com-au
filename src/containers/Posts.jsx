import React from 'react'
// import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import PostsGrid from 'components/PostsGrid'

const Posts = () => <Grid container justify='center' spacing={3}>
  <Grid item xs={12} md={8}>
    <PostsGrid />
  </Grid>
</Grid>

export default Posts
