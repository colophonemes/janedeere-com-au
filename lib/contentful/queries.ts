import client from './client'
import { flattenEntryResponse, flattenEntryResponseSingle } from './utils'
import { PageEntry, PostEntry } from './'

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

export const fetchPost = async (slug: string): Promise<PostEntry> => {
  return flattenEntryResponseSingle(
    await client.getEntries({
      content_type: 'post',
      'fields.slug': slug,
      order: '-sys.createdAt',
      include: 10,
    })
  )
}

export const fetchPosts = async (): Promise<Array<PostEntry>> => {
  return flattenEntryResponse(
    await client.getEntries({
      content_type: 'post',
    })
  )
}
