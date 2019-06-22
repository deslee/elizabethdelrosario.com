const parse = require('url').parse
const graphql = require('../dist/api/graphql').default
const nextApp = require('../dist/api/nextApp').default

// Development microservice. Delegates to other microservices
module.exports = (req, res) => {
    const parsedUrl = parse(req.url || '/', true);
    const { pathname, query } = parsedUrl;

    if (pathname === '/graphql') {
        graphql(req, res);
    }
    else {
        nextApp(req, res);
    }
}