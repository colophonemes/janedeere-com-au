import React from 'react'
import { ContentfulDocument } from 'lib/contentful'
import Link from 'components/Link'
import ButtonLink from 'components/ButtonLink'
import { makeStyles, useTheme } from '@material-ui/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { getBackgroundImageCss } from 'react-contentful-image'
import { imageSizes } from 'utilities/contentfulImageMediaQueries'

const useStyles = makeStyles((theme) => ({
  root: {},
  image: {
    height: ({ mdAndUp }) => (mdAndUp ? 300 : 150),
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    marginBottom: theme.spacing(1),
  },
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

const PictureLink = ({ fields }) => {
  const theme = useTheme()
  const mdAndUp = useMediaQuery(theme.breakpoints.up('md'))
  const classes = useStyles({ mdAndUp })
  const bgImageClass = getBackgroundImageCss(
    fields.featuredImage.fields.file.url,
    imageSizes
  )
  const linkHref = getLinkHref(fields.link)
  return (
    <div className={classes.root}>
      <Link href={linkHref}>
        <div className={[classes.image, bgImageClass].join(' ')} />
      </Link>
      <ButtonLink fullWidth variant="outlined" href={linkHref}>
        {fields.title}
      </ButtonLink>
      {fields.body && <ContentfulDocument document={fields.body} />}
    </div>
  )
}

export default PictureLink
