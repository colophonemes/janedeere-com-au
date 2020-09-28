import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Alert from '@material-ui/lab/Alert'
import AlertTitle from '@material-ui/lab/AlertTitle'
import Link from 'components/Link'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    margin: `${theme.spacing(6)}px 0`,
  },
}))

const Error = () => {
  const classes = useStyles()
  return (
    <Container fixed className={classes.root}>
      <Grid container justify="center">
        <Grid item xs={12} md={8}>
          <Typography variant="h2" gutterBottom>
            404 - Page Not Found
          </Typography>
          <Alert severity="warning">
            <Typography>
              Sorry, you tried to access a page that doesn't exist. Try using
              the navigation links above, or start again at the{' '}
              <Link href="/">Home Page</Link>.
            </Typography>
          </Alert>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Error
