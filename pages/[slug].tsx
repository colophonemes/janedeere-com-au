import Page from 'components/Page'
import { PageEntry } from 'lib/contentful'
import { fetchPage, fetchPages } from 'lib/contentful/queries'
import { GetStaticProps, GetStaticPaths } from 'next'

interface ContentfulPageProps {
  data: PageEntry
}

export default function ContentfulPage({ data }: ContentfulPageProps) {
  return <Page Page={data} />
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params?.slug || typeof params.slug !== 'string') return { props: {} }
  const data = await fetchPage(params.slug)
  return {
    props: {
      data,
    },
    revalidate: 2 * 60,
  }
}

const excludedPages = ['blog']

export const getStaticPaths: GetStaticPaths = async () => {
  const pages = await fetchPages()
  const paths = pages
    .filter((page) => !excludedPages.includes(page.fields.slug))
    .map((page) => ({ params: { slug: page.fields.slug } }))
  return {
    paths,
    fallback: false,
  }
}
