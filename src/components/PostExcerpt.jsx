import React from 'react'
import PropTypes from 'prop-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import Typography from '@material-ui/core/Typography'
import { withRouter } from 'react-router-dom'
import { rendererConfig } from 'utilities/contentful'
import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import { getBackgroundImageCss } from 'react-contentful-image'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import { withStyles } from '@material-ui/styles'

const styles = theme => ({
  content: {
    height: 180
  },
  featuredImage: {
    height: 240,
    backgroundColor: theme.palette.primary[200],
    width: '100%',
    backgroundSize: 'cover'
  }
})

const blogLink = slug => `/blog/${slug}`

const screenXs = '360px';
const screenSm = '600px';
const screenMd = '960px';
const screenLg = '1280px';
const screenXl = '1920px';

const media = {
  xs: `(min-width: ${screenXs})`,
  sm: `(min-width: ${screenSm})`,
  md: `(min-width: ${screenMd})`,
  lg: `(min-width: ${screenLg})`,
  xl: `(min-width: ${screenXl})`,
  dpr2: '(min-resolution: 144dpi)', // 1.5x devices and up get 2x images
  dpr3: '(min-resolution: 240dpi)', // 2.5x devices and up get 3x images
  portrait: '(orientation: portrait)',
  landscape: '(orientation: landscape)',
};

const imageSizes = [
  {
    mediaQuery: media.xs,
    params: {
      w: 400,
      h: 240,
      fit: 'fill',
      q: 40
    }
  },
  {
    mediaQuery: media.sm,
    params: {
      w: 400,
      h: 240,
      fit: 'fill',
      q: 70
    }
  },
  {
    mediaQuery: media.lg,
    params: {
      w: 800,
      h: 280,
      fit: 'fill',
      q: 70
    }
  },
]

const PostExcerpt = ({ title, body, slug, excerpt, featuredImage, classes, history }) => {
  excerpt = excerpt || Object.assign({}, body, { content: body.content.slice(0, 1) })
  const clickThrough = () => history.push(blogLink(slug))
  const bgImageClasses = featuredImage ? getBackgroundImageCss(featuredImage.fields.file.url, imageSizes) : null
  return <article>
    <Card className={classes.card}>
      <CardActionArea onClick={clickThrough}>
        <Box className={[bgImageClasses, classes.featuredImage].join(' ')} />
        <CardContent className={classes.content}>
          <Typography gutterBottom variant="h5" component="h4">
            {title}
          </Typography>
          {documentToReactComponents(excerpt, rendererConfig)}
        </CardContent>
      </CardActionArea>
    </Card>
  </article>
}

PostExcerpt.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.shape({
    content: PropTypes.array.isRequired
  }).isRequired,
  slug: PropTypes.string.isRequired,
  excerpt: PropTypes.object,
  featuredImage: PropTypes.object,
  classes: PropTypes.object.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
}

export default withRouter(withStyles(styles)(PostExcerpt))
