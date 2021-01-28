import Head from 'next/head'
import { useEffect } from 'react'
import { AppProps } from 'next/app'
import { ThemeProvider } from '@material-ui/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from 'utils/theme'
import { FormspreeProvider } from '@formspree/react'
import { AnalyticsProvider } from 'utilities/analytics'
import Content from 'components/layout/Content'
import { SITE_TITLE } from 'siteGlobals'

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles?.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  return (
    <>
      <Head>
        <title>{SITE_TITLE}</title>
      </Head>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <AnalyticsProvider
          trackingCode={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_TRACKING_ID}
        >
          <FormspreeProvider
            project={process.env.NEXT_PUBLIC_FORMSPREE_PROJECT_ID}
          >
            <Content>
              <Component {...pageProps} />
            </Content>
          </FormspreeProvider>
        </AnalyticsProvider>
      </ThemeProvider>
    </>
  )
}

export default MyApp
