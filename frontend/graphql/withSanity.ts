import { withData } from 'next-apollo'
import { HttpLink } from 'apollo-link-http'
import { projectId, dataset } from '../client';
import { createCache } from './apolloClient';



const link = new HttpLink({
    uri: `https://${projectId}.api.sanity.io/v1/graphql/${dataset}/default`
});

export default withData({
    link,
    createCache
})