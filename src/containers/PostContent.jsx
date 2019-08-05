import React from 'react'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import { Link as RouterLink } from 'react-router-dom'
import {rendererConfig} from 'utilities/contentful'

export const PostContent = ({title, body, slug}) => <article>
  <Box component='section'>
    <Typography variant='h1' gutterBottom>
      <Link component={RouterLink} to={`/blog/${slug}`}>{title}</Link>
    </Typography>
  </Box>
  <Box component='section'>
    {documentToReactComponents(body, rendererConfig)}
  </Box>
</article>

export const PostExcerpt = ({title, body, excerpt, slug}) => {
  excerpt = excerpt || Object.assign({}, body, {content: body.content.slice(0, 1)})
  return <article>
    <Box component='section'>
      <Typography variant='h2' gutterBottom>
        <Link component={RouterLink} to={`/blog/${slug}`}>{title}</Link>
      </Typography>
    </Box>
    <Box component='section'>
      {documentToReactComponents(excerpt, rendererConfig)}
    </Box>
  </article>
}
