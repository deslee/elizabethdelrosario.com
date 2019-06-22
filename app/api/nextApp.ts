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

const withTypescript = require('@zeit/next-typescript')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
})

const route = pathMatch()

const dev = globalConfig.env === 'development'
const nextServer = next({
    dev,
    conf: withBundleAnalyzer(withTypescript({
        env: {
            sessionIdHeaderName: globalConfig.sessionIdHeaderName,
            s3bucketUrl: `https://${globalConfig.awsS3UploadBucket}.s3.amazonaws.com`
        }
    }))
});
if (dev) {
    nextServer.prepare();
}
const nextHandler = nextServer.getRequestHandler();

const nextApp = async (req: CustomRequest, res: CustomResponse) => {
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
export default middleware(nextApp)