import React from 'react'
import PropTypes from 'prop-types'
import { BLOCKS, INLINES } from '@contentful/rich-text-types'
import { Query } from 'react-contentful'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Link from '@material-ui/core/Link'
import CircularProgress from '@material-ui/core/CircularProgress'
import { Link as RouterLink } from 'react-router-dom'
import ReactContentfulImage from 'react-contentful-image'
import Figure from 'components/Figure'
import { makeStyles } from '@material-ui/styles'

const isRelativeLink = link => /^\//.test(link)

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
    params: { w: 960 }
  },
  {
    mediaQuery: 'lg',
    params: { w: 1280 }
  },
  {
    mediaQuery: 'xl',
    params: { w: 1920 }
  }
]

const responsiveImgClasses = makeStyles({
  root: {
    width: 'auto',
    maxWidth: '100%'
  }
})

const ParagraphRenderer = (node, children) => <Typography paragraph>{children}</Typography>

const HyperlinkRenderer = (node, children) => {
  const isRelative = isRelativeLink(node.data.uri)
  if (isRelative) return <Link component={RouterLink} to={node.data.uri}>{children}</Link>
  return <Link href={node.data.uri} target='_blank' rel='noopener noreferrer'>
    {children}
  </Link>
}

const EmbeddedAssetRenderer = (node, children) => {
  const { title, file, description } = node.data.target.fields
  const classes = responsiveImgClasses()
  return <Figure
    content={<ReactContentfulImage
      src={file.url}
      sizes={imageSizes}
      alt={title}
      className={classes.root}
    />}
    caption={description}
  />
}

export const rendererConfig = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: ParagraphRenderer,
    [INLINES.HYPERLINK]: HyperlinkRenderer,
    [BLOCKS.EMBEDDED_ASSET]: EmbeddedAssetRenderer
  }
}

export const ContentfulContentQuery = props => {
  const { component: ContentComponent, single } = props
  const queryProps = { ...props }
  delete queryProps.component
  delete queryProps.single
  return <Query {...queryProps}>
    {({ data, error, fetched, loading }) => {
      if (loading || !fetched) {
        return <Box align='center'><CircularProgress /></Box>
      }

      if (error) {
        console.error(error)
        return <Typography paragraph>Error loading content!</Typography>
      }

      if (!data) {
        return <Typography paragraph>Page does not exist!</Typography>
      }

      // See the Contentful query response
      console.log('Contentful Query data', data)

      // Process and pass in the loaded `data` necessary for your page or child components.
      const componentProps = single ? data.items[0] : data
      return <ContentComponent {...componentProps} />
    }}
  </Query>
}

ContentfulContentQuery.propTypes = {
  component: PropTypes.node.isRequired,
  single: PropTypes.bool
}
