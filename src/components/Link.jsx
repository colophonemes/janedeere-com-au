import React from 'react'
import PropTypes from 'prop-types'
import Link from '@material-ui/core/Link'
import Button from '@material-ui/core/Button'
import { Link as RouterLink } from 'react-router-dom'
import { isRelativeLink } from 'utilities/links'


const WrappedLink = props => <Link {...props} component={RouterLink} />

export const ButtonLink = props => <Button {...props} component={RouterLink} />

export const ButtonLinkContentful = ({ fields: { href, variant, color, text } }) => {
  const styleProps = { variant, color }
  return isRelativeLink(href)
    ? <ButtonLink to={href} {...styleProps}>{text}</ButtonLink>
    : <Button href={href} target='_blank' rel='noopener nofollower' {...styleProps}>{text}</Button>
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
