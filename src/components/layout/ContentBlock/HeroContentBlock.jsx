import React from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import { ContentfulRenderer } from 'utilities/contentful'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme, makeStyles } from '@material-ui/styles'

const textShadow = color => [...Array(6)].map((a, i) => `0 0 ${i * 10}px ${color}`).join(', ')

const useStyles = makeStyles(theme => ({
  root: {
    fontSize: '0.1em',
    textAlign: ({ md }) => md ? 'left' : 'center',
    '& h2': {
      fontSize: ({ md }) => md ? '4rem' : '3rem',
      textTransform: 'uppercase',
      border: '2px solid',
      padding: `${theme.spacing(6)}px 0`,
      borderLeft: 'none',
      borderRight: 'none',
      color: '#4d878e',
      textShadow: textShadow('#FFF')
    },
    '& p': {
      fontSize: ({ md }) => md ? '2rem' : '1.6rem',
      textShadow: textShadow('#333')
    }
  },
  body: {
    width: ({ md }) => md ? '66%' : 'auto'
  }
}))

const HeroContentBlockRenderer = ({ body }) => {
  const theme = useTheme()
  const md = useMediaQuery(theme.breakpoints.up('md'))
  const classes = useStyles({ md })
  return <Grid container className={classes.root} justify='center' alignItems='center'>
    <Grid item className={classes.body}>
      <ContentfulRenderer document={body} />
    </Grid>
  </Grid>
}

HeroContentBlockRenderer.propTypes = {
  body: PropTypes.object
}


export default HeroContentBlockRenderer
