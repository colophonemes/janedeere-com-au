import React from 'react'
import Box from '@material-ui/core/Box'
import { withStyles } from '@material-ui/styles'

export const Img = props => <Box component='img' {...props} />

const responsiveStyles = {
  root: {
    maxWidth: '100%',
    width: 'auto'
  }
}

export const ResponsiveImg = withStyles(responsiveStyles)(
  props => <Img className={props.classes.root} {...props} />
)

export default Img
