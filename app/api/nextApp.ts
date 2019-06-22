import next from 'next'
import pathMatch from 'path-match';
import globalConfig from '../globalConfig'
import { parse } from 'url';
import http from 'http';
import SchemaLink from 'apollo-link-schema';
import schema, { binding } from '../schema'
import { CustomRequest } from '../types/CustomRequest';
import { CustomResponse } from '../types/CustomResponse';
import contextFactory from '../services/contextFactory';
import middleware from './middleware';

const route = pathMatch()

const dev = globalConfig.env === 'development'
const nextServer = next({ dev });
if (dev) {
    nextServer.prepare();
}
const nextHandler = nextServer.getRequestHandler();

const nextMiddleware = async (req: CustomRequest, res: CustomResponse) => {
    const parsedUrl = parse(req.url || '/', true);
    const { pathname, query } = parsedUrl;

    // set the SchemaLink on the request object
    (req as any).link = new SchemaLink({
        schema,
        context: _ => contextFactory(req as CustomRequest, res as CustomResponse)
    });

    const routes = [
        [route('/posts/:postId'), '/posts'],
        [route('/pages/:postId'), '/posts', { type: 'PAGE' }],
        [route('/pages'), '/posts', { type: 'PAGE' }],
    ]

    for (const [match, route, extraQueries = {}] of routes) {
        const params = match(pathname);
        if (params !== false) {
            nextServer.render(req, res, route, Object.assign(params, query, extraQueries))
            return;
        }
    }
    nextHandler(req, res, parsedUrl);
}

// initialize custom request 
export default (req: http.IncomingMessage, res: http.ServerResponse) => {
    nextMiddleware(req as CustomRequest, res as CustomResponse)
}