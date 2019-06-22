import globalConfig from '../globalConfig'
import * as fs from 'fs';
import { createPostGraphileSchema, WithPostGraphileContextOptions, withPostGraphileContext } from 'postgraphile'
import postGraphileOptions from '../services/postGraphileOptions';
import makeRemoteExecutableSchema, { FetcherOperation } from 'graphql-tools/dist/stitching/makeRemoteExecutableSchema';
import { CustomContext } from '../types/CustomContext';
import { default as sdl } from '../schema/schema.graphql';
import { GraphQLSchema, execute } from 'graphql';
import { getPool } from '../services/dbPool';
import { makeBindingClass } from 'graphql-binding';
import { BindingConstructor, Binding } from './types';
import cache from '../schema/schema.cache.json';
import { ApolloError } from 'apollo-server-micro';

const fetcher = async (operation: FetcherOperation) => {
    if (!operation.context || !operation.context.graphqlContext) {
        throw new ApolloError("Operation context not set!");
    }
    const graphqlContext: CustomContext = operation.context.graphqlContext;

    const postGraphileContextOptions = {
        ...postGraphileOptions,
        pgSettings: {
            'role': globalConfig.db.regularUser.name,
            ...graphqlContext.pgSettings // allow caller to override the pgSettings through their own context.
        },
        pgPool: getPool()
    } as WithPostGraphileContextOptions;

    const cacheFile = `${process.cwd()}/schema.cache.json`;
    fs.writeFileSync(cacheFile, JSON.stringify(cache))

    const postgraphileSchema = await createPostGraphileSchema(
        globalConfig.db.url({ admin: true }),
        "app_public",
        {
            ...postGraphileOptions,
            readCache: cacheFile,
        }
    );
    const result = withPostGraphileContext(postGraphileContextOptions, async (context) =>
        await execute(
            postgraphileSchema,
            operation.query,
            null,
            {
                ...graphqlContext,
                ...context
            },
            operation.variables,
            operation.operationName
        )
    );
    return result;
};

// create a remote schema that uses executes our postgraphile schema with the required context injected in the fetcher method
const schema = makeRemoteExecutableSchema({ fetcher, schema: sdl });
export default schema;

const getBinding = (schema: GraphQLSchema): Binding => {
    const BindingClass = makeBindingClass<BindingConstructor<Binding>>({ schema })
    return new BindingClass();
}
export const binding = getBinding(schema);

export * from './types';