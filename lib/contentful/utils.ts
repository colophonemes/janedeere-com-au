import { EntryCollection, Entry } from 'contentful'
import { TContentfulEntry, TContentfulEntryFields } from './'

export function flattenEntryResponse<T extends TContentfulEntryFields>(
  entries: EntryCollection<T>
) {
  return entries.items
}

export function flattenEntryResponseSingle<T extends TContentfulEntryFields>(
  entries: EntryCollection<T>
) {
  return flattenEntryResponse(entries)[0]
}

export const flattenEntry = (entry: TContentfulEntry) => entry.fields
