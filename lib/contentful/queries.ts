import client from './client'
import { flattenEntryResponse, flattenEntryResponseSingle } from './utils'
import { PageEntry } from './'

export const fetchPage = async (slug: string): Promise<PageEntry> => {
  return flattenEntryResponseSingle(
    await client.getEntries({
      content_type: 'page',
      'fields.slug': slug,
      include: 10,
    })
  )
}

export const fetchPages = async (): Promise<Array<PageEntry>> => {
  return flattenEntryResponse(
    await client.getEntries({
      content_type: 'page',
    })
  )
}
