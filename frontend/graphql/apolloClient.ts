import ApolloClient from "apollo-client";
import { InMemoryCache, IntrospectionFragmentMatcher } from "apollo-cache-inmemory";
import { ApolloLink } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { projectId, dataset } from "../client";
import introspectionResult from './introspection-result';

export const createCache = () => {
    const fragmentMatcher = new IntrospectionFragmentMatcher({
        introspectionQueryResultData: introspectionResult,
    });

    const cache = new InMemoryCache({
        fragmentMatcher
    });

    return cache;
}

export default new ApolloClient({
    cache: createCache(),
    link: ApolloLink.from([
        new HttpLink({
            uri: `https://${projectId}.api.sanity.io/v1/graphql/${dataset}/default`
        })
    ])
})