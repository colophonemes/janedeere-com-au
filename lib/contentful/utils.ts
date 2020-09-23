import { EntryCollection, Entry } from 'contentful'
import { EntryProps } from './'

export const flattenEntryResponse = (entries: EntryCollection<EntryProps>) =>
  entries.items

export const flattenEntryResponseSingle = (
  entries: EntryCollection<EntryProps>
) => flattenEntryResponse(entries)[0]

export const flattenEntry = (entry: Entry<EntryProps>) => entry.fields
