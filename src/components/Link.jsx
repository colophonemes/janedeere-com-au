import React from 'react'
import Link from '@material-ui/core/Link'
import Button from '@material-ui/core/Button'
import { Link as RouterLink } from 'react-router-dom'

const WrappedLink = props => <Link {...props} component={RouterLink} />
export const ButtonLink = props => <Button {...props} component={RouterLink} />

export default WrappedLink
