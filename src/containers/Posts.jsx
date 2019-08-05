import React from 'react'
import { Query } from 'react-contentful'

import {PostExcerpt} from './PostContent'
import {Container, Grid, Card, CircularProgress} from '@material-ui/core';

const Posts = props => <Container>
  <Query
    contentType="post"
    query={{
      order: '-sys.createdAt'
    }}>
      {({data, error, fetched, loading}) => {
        if (loading || !fetched) {
          return <CircularProgress />;
        }

        if (error) {
          console.error(error);
          return null;
        }

        if (!data) {
          return <p>Page does not exist.</p>;
        }

        // See the Contentful query response
        console.log(data);

        // Process and pass in the loaded `data` necessary for your page or child components.
        return <Grid container spacing={3}>
           {data.items.map(item => <Grid item xs={12} key={item.sys.id}><Card>
             <PostExcerpt {...item.fields} />
           </Card></Grid>)}
        </Grid>
      }}
  </Query>
</Container>

export default Posts
