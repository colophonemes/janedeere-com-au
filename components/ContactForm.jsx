import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/styles'
import { useForm } from '@formspree/react'
import TextField from '@material-ui/core/TextField'

const useStylesThankYou = makeStyles((theme) => ({
  root: {
    border: `2px solid ${theme.palette.primary.main}`,
    background: theme.palette.grey[100],
    padding: theme.spacing(6),
    margin: `${theme.spacing(6)}px 0`,
    borderRadius: 10,
  },
}))

const ThankYou = () => {
  const classes = useStylesThankYou()
  return (
    <div className={classes.root}>
      <Typography>
        Thanks for sending your email, I'll be in touch with you soon.
      </Typography>
      <Typography>— Jane Deere</Typography>
    </div>
  )
}

const getError = (field, fieldName, errors) => {
  const fieldErrors = errors.filter((error) => error.field === field)
  if (fieldErrors.length) {
    const error = fieldErrors[0]
    return {
      error: true,
      helperText: `${fieldName} ${error.message}`,
    }
  }
}

const nameErrors = (errors) => getError('name', 'Name', errors)
const emailErrors = (errors) => getError('email', 'Email address', errors)
const phoneErrors = (errors) => getError('phone', 'Phone number', errors)
const messageErrors = (errors) => getError('message', 'Message', errors)

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(6),
  },
  textArea: {
    minHeight: '4em',
  },
}))

const ContactForm = (props) => {
  const classes = useStyles()
  const [state, handleSubmit] = useForm('contact')
  const { submitting, succeeded, errors } = state
  if (succeeded) return <ThankYou />
  return (
    <div className={classes.root}>
      <form onSubmit={handleSubmit} noValidate>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <TextField
              label="Name"
              name="name"
              variant="filled"
              id="contact-form-name"
              fullWidth
              {...nameErrors(errors)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email address"
              name="email"
              variant="filled"
              id="contact-form-email"
              fullWidth
              {...emailErrors(errors)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Phone number"
              name="phone"
              variant="filled"
              id="contact-form-phone"
              fullWidth
              {...phoneErrors(errors)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Message"
              name="message"
              variant="filled"
              id="contact-form-message"
              inputProps={{ className: classes.textArea }}
              multiline
              fullWidth
              {...messageErrors(errors)}
            />
          </Grid>
          <Grid item xs={12} sm={8} md={6}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              type="submit"
              disabled={submitting}
            >
              Send
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  )
}

export default ContactForm
