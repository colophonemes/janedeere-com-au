import React from 'react'
import PropTypes from 'prop-types'
import { getBackgroundImageCss } from 'react-contentful-image'
import { makeStyles, useTheme } from '@material-ui/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'

const styles = (theme) => ({
  root: {
    height: (props) => (props.largeBanner ? '70vh' : '40vh'),
    maxHeight: 750,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    margin: `0 0 ${theme.spacing(3)}px 0`,
  },
})

const imageSizes = [
  {
    mediaQuery: 'default',
    params: { w: 228 },
  },
  {
    mediaQuery: 'sm',
    params: { w: 600 },
  },
  {
    mediaQuery: 'md',
    params: { w: 970 },
  },
  {
    mediaQuery: 'xl',
    params: { w: 1200 },
  },
]

const useStyles = makeStyles(styles)

const Banner = ({ image }) => {
  const theme = useTheme()
  const largeBanner = useMediaQuery(theme.breakpoints.up('md'))
  const classes = useStyles({ largeBanner })
  return (
    <div
      className={[
        getBackgroundImageCss(image.fields.file.url, imageSizes),
        classes.root,
      ].join(' ')}
    />
  )
}
Banner.propTypes = {
  image: PropTypes.shape({
    fields: PropTypes.object,
  }).isRequired,
}

export default Banner
