import ContentfulPage from './[slug]'
import { fetchPage } from 'lib/contentful/queries'

export default ContentfulPage

export async function getStaticProps() {
  const data = await fetchPage('home')
  return {
    props: {
      data,
    },
  }
}
