import client from './client'
import { flattenEntryResponse, flattenEntryResponseSingle } from './utils'

export const fetchPage = async (slug: string) => {
  return flattenEntryResponseSingle(
    await client.getEntries({
      content_type: 'page',
      'fields.slug': slug,
      include: 10,
    })
  )
}

export const fetchPages = async () => {
  return flattenEntryResponse(
    await client.getEntries({
      content_type: 'page',
    })
  )
}
