import React from 'react'
import PropTypes from 'prop-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import Box from '@material-ui/core/Box'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import { Link as RouterLink, withRouter } from 'react-router-dom'
import { rendererConfig } from 'utilities/contentful'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import { withStyles } from '@material-ui/styles'

const styles = theme => ({
  card: {
  },
  media: {
    height: 240
  }
})

const blogLink = slug => `/blog/${slug}`

const PostExcerpt = ({ title, body, slug, excerpt, featuredImage, classes, history }) => {
  excerpt = excerpt || Object.assign({}, body, { content: body.content.slice(0, 1) })
  const clickThrough = () => history.push(blogLink(slug))
  return <article>
    <Card className={classes.card}>
      <CardActionArea onClick={clickThrough}>
        {featuredImage && <CardMedia
          className={classes.media}
          image={`${featuredImage.fields.file.url}?w=400`}
          title={featuredImage.fields.description}
        />}
        <CardContent>
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
  body: PropTypes.object.isRequired,
  slug: PropTypes.string.isRequired,
  excerpt: PropTypes.object,
  featuredImage: PropTypes.object,
  classes: PropTypes.object.isRequired
}

export default withRouter(withStyles(styles)(PostExcerpt))
