import { ApolloServer } from 'apollo-server-micro';
import schema from './schema';
import contextFactory from './services/contextFactory';
import { CustomRequest } from './types/CustomRequest';
import { CustomResponse } from './types/CustomResponse';
import middleware from './middleware';

const apollo = new ApolloServer({
    schema,
    context: c => contextFactory(c.req as CustomRequest, c.res as CustomResponse),
    playground: true,
    introspection: true
})

export default middleware((req, res) => {
    apollo.createHandler()(req, res);
});