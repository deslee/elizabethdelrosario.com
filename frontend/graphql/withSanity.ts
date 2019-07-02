import { withData } from 'next-apollo'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import introspectionResult from './introspection-result';
import { projectId, dataset } from '../client';

const createCache = () => {
    const fragmentMatcher = new IntrospectionFragmentMatcher({
        introspectionQueryResultData: introspectionResult,
    });

    const cache = new InMemoryCache({
        fragmentMatcher
    });

    return cache;
}

const link = new HttpLink({
    uri: `https://${projectId}.api.sanity.io/v1/graphql/${dataset}/default`
});

export default withData({
    link,
    createCache
})