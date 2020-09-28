import {
  IButtonFields,
  IContactFormFields,
  IContentBlockFields,
  IGridContainerFields,
  IGridItemFields,
  ILinkFields,
  IPageFields,
  IPictureLinkFields,
  IPictureLinkGroupFields,
  IPostFields,
  ISeriesFields,
} from './types'
import { ContentfulDocument } from './renderers'
import { Entry } from 'contentful'

export type ButtonEntry = Entry<IButtonFields>
export type ContactFormEntry = Entry<IContactFormFields>
export type ContentBlockEntry = Entry<IContentBlockFields>
export type GridContainerEntry = Entry<IGridContainerFields>
export type GridItemEntry = Entry<IGridItemFields>
export type LinkEntry = Entry<ILinkFields>
export type PageEntry = Entry<IPageFields>
export type PictureLinkEntry = Entry<IPictureLinkFields>
export type PictureLinkGroupEntry = Entry<IPictureLinkGroupFields>
export type PostEntry = Entry<IPostFields>
export type SeriesEntry = Entry<ISeriesFields>

export type TContentfulEntry =
  | ButtonEntry
  | ContactFormEntry
  | ContentBlockEntry
  | GridContainerEntry
  | GridItemEntry
  | LinkEntry
  | PageEntry
  | PictureLinkEntry
  | PictureLinkGroupEntry
  | PostEntry
  | SeriesEntry
export { ContentfulDocument }
