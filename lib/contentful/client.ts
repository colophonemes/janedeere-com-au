import { createClient } from 'contentful'

const {
  CONTENTFUL_SPACE,
  CONTENTFUL_CONTENT_DELIVERY_ACCESS_TOKEN,
} = process.env

const client = createClient({
  space: CONTENTFUL_SPACE,
  accessToken: CONTENTFUL_CONTENT_DELIVERY_ACCESS_TOKEN,
})

export default client
