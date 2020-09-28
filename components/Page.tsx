import Head from 'next/head'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { PageEntry, ContentfulDocument } from 'lib/contentful'
import Banner from 'components/layout/Banner'
import ContentfulImage from 'components/ContentfulImage'
import { SITE_TITLE } from 'siteGlobals'

export type PageProps = {
  Page: PageEntry
}

const isHomePage = (Page: PageEntry) => Page.fields.slug === 'home'

const FullWidthPage: React.FC<PageProps> = ({ Page }) => (
  <>
    <ContentfulDocument document={Page.fields.body} />
  </>
)

const useDefaultPageStyles = makeStyles((theme) => ({
  root: {
    margin: ({ hasBanner }: { hasBanner: boolean }) =>
      `${!hasBanner ? theme.spacing(6) : 0}px auto ${theme.spacing(3)}px`,
  },
}))

const DefaultPage: React.FC<PageProps> = ({ Page }) => {
  const { heroImage, title, body, bannerImage } = Page.fields
  const classes = useDefaultPageStyles({ hasBanner: !!bannerImage })
  return (
    <Container fixed className={classes.root}>
      <Grid container spacing={3} justify="center">
        <Grid item xs={12} md={heroImage ? 12 : 8}>
          <Typography variant="h2" gutterBottom>
            {title}
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={3} justify="center">
        <Grid item xs={12} md={8}>
          <ContentfulDocument document={body} />
        </Grid>
        {heroImage && (
          <Grid item md={4}>
            <ContentfulImage image={heroImage} />
          </Grid>
        )}
      </Grid>
    </Container>
  )
}

const PageContainer: React.FC<PageProps> = ({ Page }) => {
  const { containment } = Page.fields
  switch (containment) {
    case 'full-width':
      return <FullWidthPage Page={Page} />
    case 'default':
    default:
      return <DefaultPage Page={Page} />
  }
}

const Page: React.FC<PageProps> = ({ Page }) => {
  const { title, bannerImage } = Page.fields
  const docTitle = isHomePage(Page) ? SITE_TITLE : `${title} | ${SITE_TITLE}`
  return (
    <>
      <Head>
        <title>{docTitle}</title>
      </Head>
      {bannerImage && <Banner image={bannerImage} />}
      <PageContainer Page={Page} />
    </>
  )
}

export default Page
