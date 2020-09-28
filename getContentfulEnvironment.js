const path = require('path')
const { error } = require('dotenv').config({
  path: path.resolve(__dirname, '.env.local'),
})
if (error) {
  throw error
}

const contentfulManagement = require('contentful-management')

const {
  CONTENTFUL_CONTENT_MANAGEMENT_ACCESS_TOKEN,
  CONTENTFUL_SPACE,
} = process.env

module.exports = function () {
  const contentfulClient = contentfulManagement.createClient({
    accessToken: CONTENTFUL_CONTENT_MANAGEMENT_ACCESS_TOKEN,
  })

  return contentfulClient.getSpace(CONTENTFUL_SPACE)
}
