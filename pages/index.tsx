import ContentfulPage from './[slug]'
import { fetchPage } from 'lib/contentful/queries'
import { GetStaticProps } from 'next'

export default ContentfulPage

export const getStaticProps: GetStaticProps = async () => {
  const data = await fetchPage('home')
  return {
    props: {
      data,
    },
    revalidate: 60,
  }
}
