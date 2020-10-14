import { Container, Grid, Typography } from '@material-ui/core'
import PageBase from 'components/PageBase'
import { ContentfulDocument, PostEntry } from 'lib/contentful'
import Banner from 'components/layout/Banner'
import { dateFormat } from 'utils/date'

export type PostProps = {
  Post: PostEntry
}

const Post: React.FC<PostProps> = ({ Post }) => {
  const { title, body, bannerImage } = Post.fields
  return (
    <PageBase title={title}>
      {bannerImage && <Banner image={bannerImage} />}
      <Container fixed>
        <Grid container justify="center">
          <Grid item md={8}>
            <Typography variant="h2" gutterBottom>
              {title}
            </Typography>
            <Typography gutterBottom>
              {dateFormat(Post.sys.createdAt)}
            </Typography>
            <ContentfulDocument document={body} />
          </Grid>
        </Grid>
      </Container>
    </PageBase>
  )
}

export default Post
