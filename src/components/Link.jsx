import React from 'react'
import PropTypes from 'prop-types'
import Link from '@material-ui/core/Link'
import Button from '@material-ui/core/Button'
import { Link as RouterLink } from 'react-router-dom'

const WrappedLink = props => <Link {...props} component={RouterLink} />
export const ButtonLink = props => <Button {...props} component={RouterLink} />
export const ButtonLinkContentful = ({fields}) => {
  return <ButtonLink to={fields.href} variant={fields.variant} color={fields.color}>
    {fields.text}
  </ButtonLink>
}

ButtonLinkContentful.propTypes = {
  fields: PropTypes.shape({
    text: PropTypes.string,
    href: PropTypes.string,
    variant: PropTypes.string,
    color: PropTypes.string
  }).isRequired
}

export default WrappedLink
