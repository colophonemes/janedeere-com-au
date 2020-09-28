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
export type ButtonEntryFields = IButtonFields
export type ContactFormEntry = Entry<IContactFormFields>
export type ContactFormEntryFields = IContactFormFields
export type ContentBlockEntry = Entry<IContentBlockFields>
export type ContentBlockEntryFields = IContentBlockFields
export type GridContainerEntry = Entry<IGridContainerFields>
export type GridContainerEntryFields = IGridContainerFields
export type GridItemEntry = Entry<IGridItemFields>
export type GridItemEntryFields = IGridItemFields
export type LinkEntry = Entry<ILinkFields>
export type LinkEntryFields = ILinkFields
export type PageEntry = Entry<IPageFields>
export type PageEntryFields = IPageFields
export type PictureLinkEntry = Entry<IPictureLinkFields>
export type PictureLinkEntryFields = IPictureLinkFields
export type PictureLinkGroupEntry = Entry<IPictureLinkGroupFields>
export type PictureLinkGroupEntryFields = IPictureLinkGroupFields
export type PostEntry = Entry<IPostFields>
export type PostEntryFields = IPostFields
export type SeriesEntry = Entry<ISeriesFields>
export type SeriesEntryFields = ISeriesFields

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

export type TContentfulEntryFields =
  | ButtonEntryFields
  | ContactFormEntryFields
  | ContentBlockEntryFields
  | GridContainerEntryFields
  | GridItemEntryFields
  | LinkEntryFields
  | PageEntryFields
  | PictureLinkEntryFields
  | PictureLinkGroupEntryFields
  | PostEntryFields
  | SeriesEntryFields

export { ContentfulDocument }
