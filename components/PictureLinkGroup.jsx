import React from 'react'
import PropTypes from 'prop-types'
import PictureLink from 'components/PictureLink'
import Grid from '@material-ui/core/Grid'

const PictureLinkGroup = ({ sys, fields }) => (
  <Grid container justify="center" spacing={3}>
    {fields.pictureLinks.map((pictureLink) => (
      <Grid item key={pictureLink.sys.id} xs={6}>
        <PictureLink {...pictureLink} />
      </Grid>
    ))}
  </Grid>
)

PictureLinkGroup.propTypes = {
  sys: PropTypes.object.isRequired,
  fields: PropTypes.object.isRequired,
}

export default PictureLinkGroup
