import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { SITE_TITLE } from 'siteGlobals'
console.log(SITE_TITLE)
const HeadTags = ({ title }) => <Helmet>
  <title>{`${title} – ${SITE_TITLE}`}</title>
</Helmet>

HeadTags.propTypes = {
  title: PropTypes.string
}

export default HeadTags
