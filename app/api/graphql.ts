import { ApolloServer } from 'apollo-server-micro';
import schema from '../schema';
import contextFactory from '../services/contextFactory';
import { CustomRequest } from '../types/CustomRequest';
import { CustomResponse } from '../types/CustomResponse';

const apollo = new ApolloServer({
    schema,
    context: c => contextFactory(c.req as CustomRequest, c.res as CustomResponse)
})

export default apollo.createHandler();