import React from 'react'
import PropTypes from 'prop-types'
import { getBackgroundImageCss } from 'react-contentful-image'
import { withStyles } from '@material-ui/styles'

const styles = theme => ({
  root: {
    height: '70vh',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    margin: `0 0 ${theme.spacing(3)}px 0`
  }
})

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

const Banner = ({ image, classes }) => <div
  className={[
    getBackgroundImageCss(image.fields.file.url, imageSizes),
    classes.root
  ].join(' ')}
/>

Banner.propTypes = {
  image: PropTypes.shape({
    fields: PropTypes.object
  }).isRequired,
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Banner)
