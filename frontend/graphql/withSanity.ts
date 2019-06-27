import { withData } from 'next-apollo'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import introspectionResult from './introspection-result';



const createCache = () => {
    const fragmentMatcher = new IntrospectionFragmentMatcher({
        introspectionQueryResultData: introspectionResult,
    });

    const cache = new InMemoryCache({
        fragmentMatcher,
    });

    return cache;
}

const link = new HttpLink({
    uri: 'https://sj7jy8qa.api.sanity.io/v1/graphql/production/default' // TODO: build dynamically
});

export default withData({
    link,
    createCache
})