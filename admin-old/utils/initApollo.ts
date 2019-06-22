import { ApolloClient } from 'apollo-client';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import { setContext } from 'apollo-link-context';
import { ApolloLink } from 'apollo-link';
import fetch from 'isomorphic-unfetch'
import { createUploadLink } from 'apollo-upload-client';
import {customFetch} from "./uploadFetch";

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  (global as any).fetch = fetch
}

export interface InitApolloOptions {
    getToken: () => string | undefined;
    getXsrfId: () => string | undefined;
    graphqlUri: string;
}

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined = undefined;

function createLink({ getToken, getXsrfId, graphqlUri }: InitApolloOptions) {
    return ApolloLink.from([
        onError(({ graphQLErrors, networkError }) => {
            if (graphQLErrors)
                graphQLErrors.map(({ message, locations, path }) =>
                    console.log(
                        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
                    ),
                );
            if (networkError) console.log(`[Network error]: ${networkError}`);
        }),
        setContext((_, { headers }) => {
            const token = getToken()
            return {
                headers: {
                    ...headers,
                    authorization: token ? `Bearer ${token}` : '',
                    'X-XSRF-ID': getXsrfId()
                }
            }
        }),
        createUploadLink({
            uri: graphqlUri,
            credentials: 'same-origin',
            fetch: customFetch as any
        })
    ])
}

function create(initialState: NormalizedCacheObject, options: InitApolloOptions) {
    // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
    return new ApolloClient({
        connectToDevTools: process.browser,
        ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
        link: createLink(options),
        cache: new InMemoryCache({
            cacheRedirects: {
                Query: {
                    post: (_, args, { getCacheKey }) => getCacheKey({__typename: 'Post', id: args.id })
                }
            }
        }).restore(initialState || {})
    })
}

export default function initApollo(initialState: NormalizedCacheObject, options: InitApolloOptions) {
    // Make sure to create a new client for every server-side request so that data
    // isn't shared between connections (which would be bad)
    if (!process.browser) {
        return create(initialState, options)
    }

    // Reuse client on the client-side
    if (!apolloClient) {
        apolloClient = create(initialState, options)
    }

    return apolloClient
}