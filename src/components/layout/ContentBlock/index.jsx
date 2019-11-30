import React from 'react'
import PropTypes from 'prop-types'
import Container from '@material-ui/core/Container'

import { ContentfulRenderer } from 'utilities/contentful'
import { useTheme, makeStyles } from '@material-ui/styles'
import { getBackgroundImageCss } from 'react-contentful-image'
import { imageSizes } from 'utilities/contentfulImageMediaQueries'
import HeroContentBlock from './HeroContentBlock'

const defaultPropTypes = {
  body: PropTypes.object,
  featuredImage: PropTypes.object
}

const DefaultContentBlockRenderer = ({ body }) => <div className='contentBody'>
  <ContentfulRenderer document={body} />
</div>

DefaultContentBlockRenderer.propTypes = defaultPropTypes

const contentBlockRenderers = {
  default: DefaultContentBlockRenderer,
  hero: HeroContentBlock
}

const contentBlockThemes = {
  default: theme => ({
    // textAlign: 'center'
  }),
  hero: theme => ({

  }),
  'side-by-side': theme => ({

  })
}

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: ({ height }) => height ? `${height}vh` : 'auto',
    overflow: 'hidden',
    padding: `${theme.spacing(6)}px 0`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: props => props.backgroundColor,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    textAlign: ({ textAlign }) => textAlign
  },
  content: props => ({
    color: props.textColor,
    ...props.contentBlockTheme(theme)
  })
}))

const ContentBlock = ({ sys, fields }) => {
  const theme = useTheme()
  const classes = useStyles({
    textColor: fields.textColor || theme.palette.text.primary,
    backgroundColor: fields.backgroundColor || 'transparent',
    contentBlockTheme: contentBlockThemes[fields.theme] || contentBlockThemes.default,
    height: fields.height,
    textAlign: fields.textAlign || 'left'
  })

  let backgroundImages = ''
  if (fields.backgroundImage) {
    backgroundImages = getBackgroundImageCss(
      fields.backgroundImage.fields.file.url,
      imageSizes
    )
  }

  const ContentBlockRenderer = contentBlockRenderers[fields.theme] || contentBlockRenderers.default

  return <section
    className={[
      classes.root,
      backgroundImages
    ].join(' ')}
  >
    <Container fixed className={classes.content}>
      <ContentBlockRenderer {...fields} />
    </Container>
  </section>
}

ContentBlock.propTypes = {
  sys: PropTypes.object.isRequired,
  fields: PropTypes.object.isRequired
}

export default ContentBlock
