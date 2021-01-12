import { ReactNode } from 'react'
import {
  ButtonEntry,
  ColumnListEntry,
  GridContainerEntry,
  SnippetEntry,
  TContentfulEntry,
  YoutubeEmbedEntry,
} from 'lib/contentful'
import {
  documentToReactComponents,
  Options,
  NodeRenderer,
} from '@contentful/rich-text-react-renderer'
import { Document, Node, BLOCKS, INLINES } from '@contentful/rich-text-types'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'
import Button from '@material-ui/core/Button'
import RouterLink from 'components/Link'
import ButtonLink from 'components/ButtonLink'
import ContentfulFigure from 'components/ContentfulFigure'
import { makeStyles } from '@material-ui/core/styles'
import ContentBlock from 'components/layout/ContentBlock'
import PictureLinkGroup from 'components/PictureLinkGroup'
import ContactFormRenderer from 'components/ContactForm'
import { isRelativeLink } from 'utilities/links'
import { IGridItem, IGridItemFields } from './types'

const ParagraphRenderer: NodeRenderer = (node, children) => (
  <Typography paragraph>{children}</Typography>
)

const HeadingRenderer = ({
  children,
  variant,
}: {
  children: ReactNode
  variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}) => (
  <Typography variant={variant} gutterBottom>
    {children}
  </Typography>
)

const H1Renderer: NodeRenderer = (node, children) => (
  <HeadingRenderer variant="h1">{children}</HeadingRenderer>
)
const H2Renderer: NodeRenderer = (node, children) => (
  <HeadingRenderer variant="h2">{children}</HeadingRenderer>
)
const H3Renderer: NodeRenderer = (node, children) => (
  <HeadingRenderer variant="h3">{children}</HeadingRenderer>
)
const H4Renderer: NodeRenderer = (node, children) => (
  <HeadingRenderer variant="h4">{children}</HeadingRenderer>
)
const H5Renderer: NodeRenderer = (node, children) => (
  <HeadingRenderer variant="h5">{children}</HeadingRenderer>
)
const H6Renderer: NodeRenderer = (node, children) => (
  <HeadingRenderer variant="h6">{children}</HeadingRenderer>
)

const HyperlinkRenderer: NodeRenderer = (node, children) => {
  const href = node.data.uri
  const isRelative = isRelativeLink(href)
  if (isRelative) {
    return <RouterLink href={href}>{children}</RouterLink>
  }
  return (
    <Link href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </Link>
  )
}

const useBlockquoteStyles = makeStyles((theme) => ({
  root: {
    fontStyle: 'italic',
    backgroundColor: theme.palette.grey[200],
    padding: theme.spacing(2),
    marginLeft: 0,
    marginRight: 0,
    borderRadius: 12,
    textAlign: 'center',
  },
}))

const BlockquoteRenderer: NodeRenderer = (node, children) => {
  const classes = useBlockquoteStyles()
  return <blockquote className={classes.root}>{children}</blockquote>
}

const EmbeddedAssetRenderer: NodeRenderer = (node) => (
  <ContentfulFigure image={node.data.target} />
)

/* Embedded Entry Rendererers */

type TEmbeddedEntryRenderer<T extends TContentfulEntry> = (
  target: T
) => JSX.Element

type TGridSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
interface IGridSizes {
  xs?: TGridSize
  sm?: TGridSize
  md?: TGridSize
  lg?: TGridSize
}
const isAllowedSize = (arg: number): arg is TGridSize =>
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].includes(arg)

const isNumber = (arg: unknown): arg is number => typeof arg === 'number'

const GridContainerRenderer: TEmbeddedEntryRenderer<GridContainerEntry> = ({
  fields,
}) => {
  const { gridItems, alignItems, justify } = fields
  const textAlign = fields.textAlign || 'left'
  return (
    <Grid container {...{ alignItems, justify }} style={{ textAlign }}>
      {gridItems.map(({ fields, sys }) => {
        const sizes: IGridSizes = {}
        for (const size of ['xs', 'sm', 'md', 'lg'] as (keyof IGridSizes)[]) {
          const val = fields[size]
          if (!isNumber(val) || !isAllowedSize(val)) continue
          sizes[size] = val
        }
        return (
          <Grid item key={sys.id} {...sizes}>
            <ContentfulDocument document={fields.body} />
          </Grid>
        )
      })}
    </Grid>
  )
}

const ButtonLinkRenderer: TEmbeddedEntryRenderer<ButtonEntry> = ({
  fields: { href, variant, color, text },
}) => {
  const styleProps = { variant, color }
  return isRelativeLink(href) ? (
    <ButtonLink href={href} {...styleProps}>
      {text}
    </ButtonLink>
  ) : (
    <Button href={href} target="_blank" rel="noopener nofollower">
      {text}
    </Button>
  )
}

const useColumnListStyles = makeStyles((theme) => ({
  root: {
    '& ul': {
      columnCount: 1,
      [theme.breakpoints.up('md')]: {
        columnCount: 2,
      },
      [theme.breakpoints.up('lg')]: {
        columnCount: 3,
      },
    },
  },
}))

const ColumnListRenderer: TEmbeddedEntryRenderer<ColumnListEntry> = ({
  fields: { body },
}) => {
  const classes = useColumnListStyles()
  return (
    <div className={classes.root}>
      <ContentfulDocument document={body} />
    </div>
  )
}

const SnippetRenderer: TEmbeddedEntryRenderer<SnippetEntry> = ({
  fields: { body },
}) => {
  return <ContentfulDocument document={body} />
}

const useYoutubeEmbedRendererStyles = makeStyles((theme) => ({
  videoWrapper: {
    position: 'relative',
    paddingBottom: '56.25%' /* 16:9 */,
    height: 0,
    '& iframe': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
    },
  },
}))
// from https://gist.github.com/takien/4077195
function getIdFromYoutubeURL(url: string): string {
  var ID = ''
  url = url
    .replace(/(>|<)/gi, '')
    .split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/)
  if (url[2] !== undefined) {
    ID = url[2].split(/[^0-9a-z_\-]/i)
    ID = ID[0]
  } else {
    ID = url
  }
  return ID
}

const YoutubeEmbedRenderer: TEmbeddedEntryRenderer<YoutubeEmbedEntry> = ({
  fields: { url },
}) => {
  const classes = useYoutubeEmbedRendererStyles()

  const id = getIdFromYoutubeURL(url)
  const src = `https://www.youtube.com/embed/${id}`

  return (
    <div className={classes.videoWrapper}>
      <iframe
        width="560"
        height="315"
        src={src}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  )
}

const embeddedEntryRenderers: Record<string, TEmbeddedEntryRenderer<any>> = {
  contentBlock: ContentBlock,
  pictureLinkGroup: PictureLinkGroup,
  button: ButtonLinkRenderer,
  gridContainer: GridContainerRenderer,
  contactForm: ContactFormRenderer,
  columnList: ColumnListRenderer,
  snippet: SnippetRenderer,
  youtubeEmbed: YoutubeEmbedRenderer,
}

const EmbeddedEntryRenderer: NodeRenderer = (node) => {
  const contentType = node.data?.target?.sys?.contentType?.sys?.id
  const Renderer = embeddedEntryRenderers[contentType]
  return (
    <Box marginBottom={3}>
      {Renderer ? (
        <Renderer {...node.data.target} />
      ) : (
        <div>
          <strong>Unknown content type {contentType}</strong>
        </div>
      )}
    </Box>
  )
}

export const rendererConfig: Options = {
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
    [BLOCKS.EMBEDDED_ASSET]: EmbeddedAssetRenderer,
  },
}

export const renderDocument = (document: Document) =>
  documentToReactComponents(document, rendererConfig)

export const ContentfulDocument: React.FC<{
  document: Document | undefined
}> = ({ document }) => <>{document && renderDocument(document)}</>
