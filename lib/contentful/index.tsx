import { Entry, EntryFields, Asset } from 'contentful'
import { Document } from '@contentful/rich-text-types'
import { ContentfulDocument } from './renderers'

export type EntryProps = PageProps

export type PageProps = {
  title: EntryFields.Text
  slug: EntryFields.Text
  body: Document
  featuredImage: Asset
  bannerImage: Asset
  heroImage: Asset
}

export type PageEntry = Entry<PageProps>

export { ContentfulDocument }
