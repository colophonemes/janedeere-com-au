import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import ReactGA from 'react-ga'

const { REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID, NODE_ENV } = process.env

ReactGA.initialize(REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID)

export const withTracker = (WrappedComponent, options = {}) => {
  const trackPage = page => {
    ReactGA.set({
      page,
      ...options
    })
    ReactGA.pageview(page)
  }

  const HOC = props => {
    useEffect(() => {
      if (NODE_ENV !== 'development') {
        trackPage(props.location.pathname)
      }
    }, [props.location.pathname])

    HOC.propTypes = {
      location: PropTypes.object
    }

    return <WrappedComponent {...props} />
  }

  return HOC
}
