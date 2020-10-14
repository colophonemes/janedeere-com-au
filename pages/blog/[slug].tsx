import Page from 'components/Page'
import { PostEntry } from 'lib/contentful'
import { fetchPost, fetchPosts } from 'lib/contentful/queries'
import { GetStaticProps, GetStaticPaths } from 'next'
import Post from 'components/Post'

interface ContentfulPostProps {
  PostData: PostEntry
}

export default function ContentfulPost({ PostData }: ContentfulPostProps) {
  return <Post Post={PostData} />
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params?.slug || typeof params.slug !== 'string') return { props: {} }
  const PostData = await fetchPost(params.slug)
  return {
    props: {
      PostData,
    },
    revalidate: 2 * 60,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const Posts = await fetchPosts()
  const paths = Posts.map((Post) => ({ params: { slug: Post.fields.slug } }))
  return {
    paths,
    fallback: false,
  }
}
