import React from 'react'
import PropTypes from 'prop-types'
import ContentfulImage from 'components/ContentfulImage'
import Figure from 'components/Figure'

const ContentfulFigure = ({ image }) => image
  ? <Figure content={<ContentfulImage image={image} responsive />} caption={image.fields.description} />
  : null

ContentfulFigure.propTypes = {
  image: PropTypes.shape({
    fields: PropTypes.object.isRequired
  }).isRequired
}

export default ContentfulFigure
