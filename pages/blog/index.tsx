import { GetStaticProps } from 'next'
import { fetchPage, fetchPosts } from 'lib/contentful/queries'
import { PageEntry, PostEntry } from 'lib/contentful'
import Page from 'components/Page'
import PostPreview from 'components/PostPreview'

export type BlogProps = {
  PageData: PageEntry
  Posts: PostEntry[]
}

export default function Blog({ PageData, Posts }: BlogProps) {
  console.log(Posts)
  return (
    <>
      <Page Page={PageData}>
        {Posts.map((Post) => (
          <PostPreview key={Post.sys.id} Post={Post} />
        ))}
      </Page>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const PageData = await fetchPage('blog')
  const Posts = await fetchPosts()
  console.log(Posts)
  return {
    props: {
      PageData,
      Posts,
    },
    revalidate: 2 * 1000,
  }
}
