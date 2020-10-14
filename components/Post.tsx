import { Container, Grid, Typography } from '@material-ui/core'
import PageBase from 'components/PageBase'
import { ContentfulDocument, PostEntry } from 'lib/contentful'
import HR from 'components/HR'
import Banner from 'components/layout/Banner'
import { dateFormat } from 'utils/date'
import { makeStyles } from '@material-ui/core'

export type PostProps = {
  Post: PostEntry
}

const useStyles = makeStyles((theme) => ({
  excerpt: {
    fontWeight: 700,
    fontStyle: 'italic',
    color: theme.palette.grey[600],
  },
}))

const Post: React.FC<PostProps> = ({ Post }) => {
  const classes = useStyles()
  const { title, body, bannerImage, excerpt } = Post.fields
  return (
    <PageBase title={title}>
      {bannerImage && <Banner image={bannerImage} />}
      <Container fixed>
        <Grid container justify="center">
          <Grid item md={8}>
            <Typography variant="h2" gutterBottom align="center">
              {title}
            </Typography>
            {excerpt && (
              <Typography
                align="center"
                gutterBottom
                variant="h4"
                component="p"
                className={classes.excerpt}
              >
                {excerpt}
              </Typography>
            )}
            <Typography gutterBottom align="center">
              {dateFormat(Post.sys.createdAt)}
            </Typography>
            <HR />
            <ContentfulDocument document={body} />
          </Grid>
        </Grid>
      </Container>
    </PageBase>
  )
}

export default Post
