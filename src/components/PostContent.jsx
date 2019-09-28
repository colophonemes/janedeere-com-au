import React from 'react'
import PropTypes from 'prop-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import Box from '@material-ui/core/Box'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import { Link as RouterLink } from 'react-router-dom'
import { rendererConfig } from 'utilities/contentful'

const Byline = ({ authors }) => <Box gutterBottom>
  {authors.map(({fields}) => <Typography>{fields.name}</Typography>)}
</Box>

const PostContent = ({ fields: { title, body, slug, authors }, sys }) => {
  return <article>
    <Box component='section'>
      <Typography variant='h2' gutterBottom>
        <Link color='inherit' component={RouterLink} to={`/blog/${slug}`}>{title}</Link>
      </Typography>
    </Box>
    <Box component='section'><Byline authors={authors} /></Box>
    <Box component='section'>
      {documentToReactComponents(body, rendererConfig)}
    </Box>
  </article>
}

PostContent.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.object.isRequired,
  slug: PropTypes.string.isRequired
}

export default PostContent
