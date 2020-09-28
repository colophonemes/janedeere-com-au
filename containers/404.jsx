import React from 'react'
import Typography from '@material-ui/core/Typography'
import Link from 'components/Link'

const FourOhFour = () => (
  <div>
    <Typography variant="h2" gutterBottom>
      Page not found!
    </Typography>
    <Typography paragraph>Sorry, we couldn{"'"}t find that page!</Typography>
    <Typography paragraph>
      Try starting again at the <Link href="/">home page</Link>, or{' '}
      <Link href="/">browse the blog archive</Link>.
    </Typography>
  </div>
)

export default FourOhFour
