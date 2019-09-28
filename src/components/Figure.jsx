import React from 'react'
import PropTypes from 'prop-types'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
  root: {
    margin: '30px 0'
  },
  content: props => {
    console.log('Content props', props)
    return {
      marginBottom: props.hasCaption ? '0.2em' : 0
    }
  },
  caption: {
    textAlign: 'center'
  }
})

const Figure = ({ content, caption }) => {
  console.log(caption)
  const classes = useStyles({ hasCaption: !!caption })
  return <figure className={classes.root}>
    <div className={classes.content}>{content}</div>
    {caption && <Typography variant='caption' component='figcaption' className={classes.caption}>
      {caption}
    </Typography>}
  </figure>
}

Figure.propTypes = {
  content: PropTypes.object,
  caption: PropTypes.object
}

export default Figure
