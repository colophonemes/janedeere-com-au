import { createContext, useContext } from 'react'
import ReactGA from 'react-ga4'

const AnalyticsContext = createContext(null as null | typeof ReactGA)

const { Provider } = AnalyticsContext

let initialized = false

export const AnalyticsProvider: React.FC<{ trackingCode: string }> = ({
  trackingCode,
  children,
}) => {
  const tracker = trackingCode ? ReactGA : null
  if (!initialized) {
    tracker?.initialize(trackingCode)
    initialized = true
  }
  return <Provider value={tracker}>{children}</Provider>
}

export const useAnalytics = () => useContext(AnalyticsContext)
