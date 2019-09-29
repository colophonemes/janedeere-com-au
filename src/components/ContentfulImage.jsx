import React from 'react'
import PropTypes from 'prop-types'
import ReactContentfulImage from 'react-contentful-image'
import { withStyles } from '@material-ui/styles'

const imageSizes = [
  {
    mediaQuery: 'default',
    params: { w: 228 }
  },
  {
    mediaQuery: 'sm',
    params: { w: 600 }
  },
  {
    mediaQuery: 'md',
    params: { w: 970 }
  },
  {
    mediaQuery: 'xl',
    params: { w: 1200 }
  }
]

const styles = {
  root: {
    width: 'auto',
    maxWidth: '100%'
  }
}

const ContentfulImage = props => {
  const { classes, image, responsive } = props
  const imgProps = { ...props }
  delete imgProps.classes
  delete imgProps.featuredImage
  delete imgProps.responsive
  if (image) {
    imgProps.src = image.fields.file.url
    imgProps.title = image.fields.title
  }
  const componentClasses = [classes.root]
  if (responsive) componentClasses.push(classes.responsive)
  return <ReactContentfulImage {...imgProps} sizes={imageSizes} className={componentClasses.join(' ')} />
}

ContentfulImage.propTypes = {
  classes: PropTypes.object,
  image: PropTypes.shape({
    fields: PropTypes.object.isRequired
  }).isRequired,
  responsive: PropTypes.bool
}

export default withStyles(styles)(ContentfulImage)
