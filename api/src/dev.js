const parse = require('url').parse
const graphql = require('../dist/graphql').default

// Development microservice. Delegates to other microservices
module.exports = (req, res) => {
    const parsedUrl = parse(req.url || '/', true);
    const { pathname, query } = parsedUrl;

    if (pathname === '/graphql') {
        graphql(req, res);
    }
    else {
        res.statusCode = 404;
        res.end("")
    }
}