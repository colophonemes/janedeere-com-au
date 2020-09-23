import { PageEntry } from 'lib/contentful'
import { ContentfulDocument } from 'lib/contentful'

export type PageProps = {
  Page: PageEntry
}

const Page: React.FC<PageProps> = ({ Page }) => {
  const { body } = Page.fields
  return <ContentfulDocument document={body} />
}

export default Page
