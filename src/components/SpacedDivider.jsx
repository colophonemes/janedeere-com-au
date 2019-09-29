import React from 'react'
import PropTypes from 'prop-types'
import Divider from '@material-ui/core/Divider'
import { withStyles } from '@material-ui/styles'

const styles = theme => ({
  root: {
    margin: props => `${theme.spacing(props.spacing || 6)}px auto`
  }
})

const SpacedDivider = ({ classes, spacing }) => <Divider className={classes.root} />

SpacedDivider.propTypes = {
  classes: PropTypes.object.isRequired,
  spacing: PropTypes.number
}

export default withStyles(styles)(SpacedDivider)
