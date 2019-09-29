import React from 'react'
import PropTypes from 'prop-types'
import { BLOCKS, INLINES } from '@contentful/rich-text-types'
import { Query } from 'react-contentful'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Link from '@material-ui/core/Link'
import CircularProgress from '@material-ui/core/CircularProgress'
import { Link as RouterLink } from 'react-router-dom'
import FourOhFour from 'containers/404'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import ContentfulFigure from 'components/ContentfulFigure'
import { makeStyles } from '@material-ui/styles'

const isRelativeLink = link => /^\//.test(link)

const ParagraphRenderer = (node, children) => <Typography paragraph>{children}</Typography>

const HyperlinkRenderer = (node, children) => {
  const isRelative = isRelativeLink(node.data.uri)
  if (isRelative) return <Link component={RouterLink} to={node.data.uri}>{children}</Link>
  return <Link href={node.data.uri} target='_blank' rel='noopener noreferrer'>
    {children}
  </Link>
}

const blockquoteStyles = makeStyles(theme => ({
  root: {
    fontStyle: 'italic',
    backgroundColor: theme.palette.grey[200],
    padding: theme.spacing(2),
    marginLeft: 0,
    marginRight: 0,
    borderRadius: 12
  },
  footer: {
    fontStyle: 'normal',
    textAlign: 'right',
    color: theme.palette.grey[700]
  }
}))

// dash chars from https://www.fileformat.info/info/unicode/category/Pd/list.htm
export const isQuoteAuthor = str => /^[-֊־᐀᠆‐‑‒–—―⸗⸚⸺⸻⹀〜〰゠︱︲﹘﹣－]/.test(str)

const BlockquoteRenderer = (node, children) => {
  const classes = blockquoteStyles()
  // Separate the last line as the author text, to be right-aligned
  const quoteBody = children.slice(0, children.length - 1)
  let quoteAuthor = children.slice(children.length - 1)[0]
  const quoteAuthorText = quoteAuthor.props.children[0]
  // if the string doesn't start with a dash, put the last line back into the regular text
  if (typeof quoteAuthorText !== 'string' | !isQuoteAuthor(quoteAuthorText)) {
    quoteBody.push(quoteAuthor)
    quoteAuthor = null
  }
  return <blockquote className={classes.root}>
    {quoteBody}
    {quoteAuthor && <Typography component='footer' className={classes.footer}>{quoteAuthor.props.children}</Typography>}
  </blockquote>
}

const EmbeddedAssetRenderer = node => <ContentfulFigure image={node.data.target} />

export const rendererConfig = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: ParagraphRenderer,
    [BLOCKS.QUOTE]: BlockquoteRenderer,
    [INLINES.HYPERLINK]: HyperlinkRenderer,
    [BLOCKS.EMBEDDED_ASSET]: EmbeddedAssetRenderer
  }
}

export const ContentfulRenderer = ({ document }) => documentToReactComponents(document, rendererConfig)

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

      if (!data || !data.items.length) {
        return <FourOhFour />
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
  component: PropTypes.func.isRequired,
  single: PropTypes.bool
}
