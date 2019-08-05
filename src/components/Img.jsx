import React from 'react'
import Box from '@material-ui/core/Box'

const responsiveStyle = {
  maxWidth: '100%',
  width: 'auto'
}

export const Img = props => <Box component='img' {...props} />

export const ResponsiveImg = props => <Box component='img' style={responsiveStyle} {...props} />

export default Img
