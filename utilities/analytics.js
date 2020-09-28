import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import ReactGA from 'react-ga'

ReactGA.initialize(process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_TRACKING_ID)

export const withTracker = (WrappedComponent, options = {}) => {
  const trackPage = (page) => {
    ReactGA.set({
      page,
      ...options,
    })
    ReactGA.pageview(page)
  }

  const HOC = (props) => {
    useEffect(() => {
      if (process.env.NODE_ENV !== 'development') {
        trackPage(props.location.pathname)
      }
    }, [props.location.pathname])

    HOC.propTypes = {
      location: PropTypes.object,
    }

    return <WrappedComponent {...props} />
  }

  return HOC
}
