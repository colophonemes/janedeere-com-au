import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import { PostEntry } from 'lib/contentful'
import NextLink from 'next/link'
import ButtonLink from './ButtonLink'
import { makeStyles } from '@material-ui/core'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import { dateFormat } from 'utils/date'

type PostPreviewProps = {
  Post: PostEntry
}

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(8),
  },
  bodyLink: {
    color: theme.palette.text.primary,
    textDecoration: 'none',
  },
  date: {
    color: theme.palette.grey[400],
  },
  bannerImage: {
    height: 300,
    marginBottom: theme.spacing(2),
  },
}))

const PostPreview: React.FC<PostPreviewProps> = ({ Post }) => {
  const classes = useStyles()
  const postLink = `/blog/${Post.fields.slug}`
  return (
    <Card className={classes.root}>
      <NextLink href={postLink} passHref className={classes.bodyLink}>
        <CardContent>
          {Post.fields.bannerImage && (
            <CardMedia
              className={classes.bannerImage}
              image={`https:${Post.fields.bannerImage.fields.file.url}?w=800`}
            />
          )}
          <Typography variant="h3">{Post.fields.title}</Typography>
          {Post.fields.excerpt && (
            <Typography gutterBottom>{Post.fields.excerpt}</Typography>
          )}
          <Typography className={classes.date}>
            {dateFormat(Post.sys.createdAt)}
          </Typography>
        </CardContent>
      </NextLink>
      <CardActions>
        <ButtonLink href={postLink} color="primary">
          Read more <ChevronRightIcon />
        </ButtonLink>
      </CardActions>
    </Card>
  )
}

export default PostPreview
