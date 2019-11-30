import React from 'react'
import PropTypes from 'prop-types'
import { ContentfulContentQuery, ContentfulRenderer } from 'utilities/contentful'
import { makeStyles } from '@material-ui/styles'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Banner from 'components/layout/Banner'
import Typography from '@material-ui/core/Typography'
import HeadTags from 'components/layout/HeadTags'
import ContentfulImage from 'components/ContentfulImage'

const useStyles = makeStyles(theme => ({
  root: {
    margin: ({ hasBanner }) => `${!hasBanner ? theme.spacing(6) : 0}px auto ${theme.spacing(3)}px`
  }
}))

const PageContent = ({ fields: { title, body, featuredImage, bannerImage, heroImage } }) => {
  const classes = useStyles({
    hasBanner: !!bannerImage
  })
  return <div className={classes.root}>
    <HeadTags title={title} />
    {bannerImage && <Banner image={bannerImage} />}
    <Container fixed>
      <Grid container spacing={3} justify='center'>
        <Grid item xs={12} md={8}>
          <Typography variant='h2' gutterBottom>{title}</Typography>
          <ContentfulRenderer document={body} />
        </Grid>
        {heroImage && <Grid item md={4}>
          <ContentfulImage image={heroImage} />}
        </Grid>}
      </Grid>
    </Container>
  </div>
}

PageContent.propTypes = {
  fields: PropTypes.shape({
    title: PropTypes.string.isRequired,
    body: PropTypes.object,
    featuredImage: PropTypes.object,
    bannerImage: PropTypes.object,
    heroImage: PropTypes.object
  })
}

const Page = ({ match: { params: { slug } } }) => <ContentfulContentQuery
  contentType='page'
  query={{ 'fields.slug': slug }}
  component={PageContent}
  single
/>

Page.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      slug: PropTypes.string.isRequired
    })
  }).isRequired
}

export default Page
