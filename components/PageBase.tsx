import { usePageView } from 'utilities/analytics'

const PageBase: React.FC<{ title: string }> = ({ children, title }) => {
  usePageView(title)
  return <>{children}</>
}

export default PageBase
