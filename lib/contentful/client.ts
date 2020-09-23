import { createClient } from 'contentful'

const {
  NEXT_PUBLIC_CONTENTFUL_SPACE,
  NEXT_PUBLIC_CONTENTFUL_CONTENT_DELIVERY_ACCESS_TOKEN,
} = process.env

const client = createClient({
  space: NEXT_PUBLIC_CONTENTFUL_SPACE,
  accessToken: NEXT_PUBLIC_CONTENTFUL_CONTENT_DELIVERY_ACCESS_TOKEN,
})

export default client
