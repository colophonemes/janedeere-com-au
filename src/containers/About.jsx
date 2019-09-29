import React from 'react'
import PropTypes from 'prop-types'
import { ContentfulContentQuery, ContentfulRenderer } from 'utilities/contentful'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import ContentfulFigure from 'components/ContentfulFigure'

const AboutContent = ({ fields: { title, body, featuredImage } }) => {
  return <div>
    <Typography variant='h2' gutterBottom>{title}</Typography>
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <ContentfulRenderer document={body} />
      </Grid>
      <Grid item xs={12} md={6}>
        <ContentfulFigure image={featuredImage} />
      </Grid>
    </Grid>
  </div>
}
AboutContent.propTypes = {
  fields: PropTypes.shape({
    title: PropTypes.string.isRequired,
    body: PropTypes.object,
    featuredImage: PropTypes.object
  })
}

const About = props => <ContentfulContentQuery
  contentType='page'
  query={{ 'fields.slug': 'about' }}
  component={AboutContent}
  single
/>

export default About
