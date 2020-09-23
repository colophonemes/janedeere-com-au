import { useEffect } from 'react'
import { AppProps } from 'next/app'
import { ThemeProvider } from '@material-ui/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from 'utils/theme'
import { StaticKitProvider } from '@statickit/react'
import Content from 'components/layout/Content'

const { NEXT_PUBLIC_STATICKIT_SITE_ID } = process.env

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
      <CssBaseline />
      <ThemeProvider theme={theme}>
        {/* <StaticKitProvider site={NEXT_PUBLIC_STATICKIT_SITE_ID}> */}
        <Content>
          <Component {...pageProps} />
        </Content>
        {/* </StaticKitProvider> */}
      </ThemeProvider>
    </>
  )
}

export default MyApp
