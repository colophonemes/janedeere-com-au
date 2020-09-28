import { EntryCollection, Entry } from 'contentful'
import { TContentfulEntry } from './'

export const flattenEntryResponse = (
  entries: EntryCollection<TContentfulEntry>
) => entries.items

export const flattenEntryResponseSingle = (
  entries: EntryCollection<TContentfulEntry>
) => flattenEntryResponse(entries)[0]

export const flattenEntry = (entry: Entry<TContentfulEntry>) => entry.fields
