import React from 'react'
import { Query } from 'react-contentful'

import {PostContent} from './PostContent'

const Post = ({match}) => <div>
  <Query contentType='post' query={{'fields.slug': match.params.postSlug}}>
    {({data, error, fetched, loading}) => {
        if (loading || !fetched) {
          return null;
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
        return <div>
         {data.items.map(item => <PostContent key={item.sys.id} {...item.fields} />)}
        </div>
    }}
  </Query>

</div>

export default Post
