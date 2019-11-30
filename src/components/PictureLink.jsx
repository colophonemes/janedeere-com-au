import React from 'react'
import PropTypes from 'prop-types'
import { ContentfulRenderer } from 'utilities/contentful'
import Link, { ButtonLink } from 'components/Link'
import { makeStyles, useTheme } from '@material-ui/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { getBackgroundImageCss } from 'react-contentful-image'
import { imageSizes } from 'utilities/contentfulImageMediaQueries'

const useStyles = makeStyles(theme => ({
  root: {

  },
  image: {
    height: ({ mdAndUp }) => mdAndUp ? 300 : 150,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    marginBottom: theme.spacing(1)
  }
}))

const getLinkHref = ({ sys, fields }) => {
  const type = sys.contentType.sys.id
  const { slug } = fields
  switch (type) {
    case 'post':
      return `/posts/${slug}`
    default:
      return `/${slug}`
  }
}

const PictureLink = ({ sys, fields }) => {
  const theme = useTheme()
  const mdAndUp = useMediaQuery(theme.breakpoints.up('md'))
  const classes = useStyles({ mdAndUp })
  const linkHref = getLinkHref(fields.link)
  return <div className={classes.root}>
    <Link to={linkHref}>
      <div className={[
        classes.image,
        getBackgroundImageCss(
          fields.featuredImage.fields.file.url,
          imageSizes
        )
      ].join(' ')} />
    </Link>
    <ButtonLink fullWidth variant='outlined' to={linkHref}>{fields.title}</ButtonLink>
    {fields.body && <ContentfulRenderer document={fields.body} />}
  </div>
}

PictureLink.propTypes = {
  sys: PropTypes.object.isRequired,
  fields: PropTypes.object.isRequired
}

export default PictureLink
