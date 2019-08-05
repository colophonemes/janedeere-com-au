import React from 'react'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import styled from 'styled-components'
const WideImage = styled.div`
  background-image: url(https://images.ctfassets.net/mmuao815pexb/1tkcRcXZ6IC8YBmf2abfNn/dba1c8d4484be2684fc06525d731576c/DSC_0471_-_20161228_-_Dasha_Agapanthus_Frost__small__.jpg?w=1200);
  text-align: center;
  background-size: cover;
`

const Home = props => <div>
  <WideImage>
      <Container>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={3}
        >
          <Grid item xs={12}>
            <h2>Test</h2>
            <p>Post 1</p>
          </Grid>
        </Grid>
      </Container>
    </WideImage>
</div>

export default Home
