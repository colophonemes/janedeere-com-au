import React from 'react'
import { FormattedDate } from 'react-intl'

const _FormattedDate = props => <FormattedDate day='numeric' month='long' year='numeric' {...props} />

export default _FormattedDate
