import React from 'react'
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import { Link as RouterLink } from 'react-router-dom'
import ReactContentfulImage from 'react-contentful-image';
import Figure from 'components/Figure'
import { makeStyles } from '@material-ui/styles'

const isRelativeLink = link => /^\//.test(link)

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
    params: { w: 960 },
  },
  {
    mediaQuery: 'lg',
    params: { w: 1280 },
  },
  {
    mediaQuery: 'xl',
    params: { w: 1920 },
  },
]

const responsiveImgClasses = makeStyles({
  root: {
    width: 'auto',
    maxWidth: '100%'
  },
})

export const rendererConfig = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => <Typography paragraph>{children}</Typography>,
    [INLINES.HYPERLINK]: (node, children) => {
      const isRelative = isRelativeLink(node.data.uri)
      if (isRelative) return <Link component={RouterLink} to={node.data.uri}>{children}</Link>
      return <Link href={node.data.uri} target='_blank' rel='noopener noreferrer'>
        {children}
      </Link>
    },
    [BLOCKS.EMBEDDED_ASSET]: (node, children) => {
      const {title, file, description} = node.data.target.fields
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
  }
}
