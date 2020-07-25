import React from 'react'
import PropTypes from 'prop-types'
import { BLOCKS, INLINES } from '@contentful/rich-text-types'
import { Query } from 'react-contentful'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'
import CircularProgress from '@material-ui/core/CircularProgress'
import { Link as RouterLink } from 'react-router-dom'
import FourOhFour from 'containers/404'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import ContentfulFigure from 'components/ContentfulFigure'
import { makeStyles } from '@material-ui/styles'
import ContentBlock from 'components/layout/ContentBlock'
import PictureLinkGroup from 'components/PictureLinkGroup'
import { ButtonLinkContentful } from 'components/Link'
import ContactFormRenderer from 'components/ContactForm'
import { isRelativeLink } from 'utilities/links'

const ParagraphRenderer = (node, children) => <Typography paragraph>{children}</Typography>

const HeadingRenderer = ({ children, variant }) => <Typography variant={variant} gutterBottom>
  {children}
</Typography>
HeadingRenderer.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.string
}
const H1Renderer = (node, children) => <HeadingRenderer variant='h1'>{children}</HeadingRenderer>
const H2Renderer = (node, children) => <HeadingRenderer variant='h2'>{children}</HeadingRenderer>
const H3Renderer = (node, children) => <HeadingRenderer variant='h3'>{children}</HeadingRenderer>
const H4Renderer = (node, children) => <HeadingRenderer variant='h4'>{children}</HeadingRenderer>
const H5Renderer = (node, children) => <HeadingRenderer variant='h5'>{children}</HeadingRenderer>
const H6Renderer = (node, children) => <HeadingRenderer variant='h6'>{children}</HeadingRenderer>

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

const GridContainerRenderer = ({ fields }) => {
  const { gridItems, alignItems, justify } = fields
  const textAlign = fields.textAlign || 'left'
  return <Grid container {...{ alignItems, justify }} style={{ textAlign }}>
    {gridItems.map(({ fields, sys }) => {
      const sizes = {}
      for (const size of ['xs', 'sm', 'md', 'lg']) {
        if (fields[size]) sizes[size] = fields[size]
      }
      return <Grid item key={sys.id} {...sizes}>
        <ContentfulRenderer document={fields.body} />
      </Grid>
    })}
  </Grid>
}

GridContainerRenderer.propTypes = {
  fields: PropTypes.shape({
    gridItems: PropTypes.array,
    alignItems: PropTypes.string,
    justify: PropTypes.string
  })
}

const embeddedEntryRenderers = {
  contentBlock: ContentBlock,
  pictureLinkGroup: PictureLinkGroup,
  button: ButtonLinkContentful,
  gridContainer: GridContainerRenderer,
  contactForm: ContactFormRenderer
}

const embeddedEntryRendererStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(3)
  }
}))

const EmbeddedEntryRenderer = node => {
  const classes = embeddedEntryRendererStyles()
  const contentType = node.data.target.sys.contentType.sys.id
  const Renderer = embeddedEntryRenderers[contentType]
  return <div className={classes.root}>
    {Renderer
      ? <Renderer {...node.data.target} />
      : <div><strong>Unknown content type {contentType}</strong></div>
    }
  </div>
}

export const rendererConfig = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: ParagraphRenderer,
    [BLOCKS.HEADING_1]: H1Renderer,
    [BLOCKS.HEADING_2]: H2Renderer,
    [BLOCKS.HEADING_3]: H3Renderer,
    [BLOCKS.HEADING_4]: H4Renderer,
    [BLOCKS.HEADING_5]: H5Renderer,
    [BLOCKS.HEADING_6]: H6Renderer,
    [BLOCKS.QUOTE]: BlockquoteRenderer,
    [INLINES.HYPERLINK]: HyperlinkRenderer,
    [BLOCKS.EMBEDDED_ENTRY]: EmbeddedEntryRenderer,
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
