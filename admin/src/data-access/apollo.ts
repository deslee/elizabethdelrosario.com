import { ApolloClient } from 'apollo-client';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import { setContext } from 'apollo-link-context';
import { ApolloLink } from 'apollo-link';
import { createUploadLink } from 'apollo-upload-client';

const parseHeaders = (rawHeaders: any) => {
    const headers = new Headers();
    // Replace instances of \r\n and \n followed by at least one space or horizontal tab with a space
    // https://tools.ietf.org/html/rfc7230#section-3.2
    const preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, " ");
    preProcessedHeaders.split(/\r?\n/).forEach((line: any) => {
        const parts = line.split(":");
        const key = parts.shift().trim();
        if (key) {
            const value = parts.join(":").trim();
            headers.append(key, value);
        }
    });
    return headers;
};

export const uploadFetch = (url: string, options: any) =>
    new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = () => {
            const opts: any = {
                status: xhr.status,
                statusText: xhr.statusText,
                headers: parseHeaders(xhr.getAllResponseHeaders() || "")
            };
            opts.url =
                "responseURL" in xhr
                    ? xhr.responseURL
                    : opts.headers.get("X-Request-URL");
            const body = "response" in xhr ? xhr.response : (xhr as any).responseText;
            resolve(new Response(body, opts));
        };
        xhr.onerror = () => {
            reject(new TypeError("Network request failed"));
        };
        xhr.ontimeout = () => {
            reject(new TypeError("Network request failed"));
        };
        xhr.open(options.method, url, true);

        Object.keys(options.headers).forEach(key => {
            xhr.setRequestHeader(key, options.headers[key]);
        });

        if (xhr.upload) {
            xhr.upload.onprogress = options.onProgress;
        }

        if (options.onAbortPossible) {
            options.onAbortPossible(() => {
                xhr.abort();
            });
        }

        xhr.send(options.body);
    });

export const customFetch = (uri: any, options: any) => {
    if (options.useUpload) {
        return uploadFetch(uri, options);
    }
    return fetch(uri, options);
};

export interface InitApolloOptions {
    getToken: () => string | undefined;
    getXsrfId: () => string | undefined;
}

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined = undefined;

function browserLink({ getToken, getXsrfId }: InitApolloOptions) {
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
            uri: '/graphql',
            credentials: 'same-origin',
            fetch: customFetch as any
        })
    ])
}

function create(initialState: NormalizedCacheObject, options: InitApolloOptions) {
    // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
    return new ApolloClient({
        connectToDevTools: true,
        ssrMode: false, // Disables forceFetch on the server (so queries are only run once)
        link: browserLink(options),
        cache: new InMemoryCache({
            cacheRedirects: {
                Query: {
                    post: (_, args, { getCacheKey }) => getCacheKey({ __typename: 'Post', id: args.id })
                }
            }
        }).restore(initialState || {})
    })
}

export default function initApollo(initialState: NormalizedCacheObject, options: InitApolloOptions) {
    if (!apolloClient) {
        apolloClient = create(initialState, options)
    }

    return apolloClient
}