import globalConfig from './app/globalConfig'
import postgraphile from 'postgraphile';
import postGraphileOptions from './app/services/postGraphileOptions';

const path = process.argv.slice(2)[0]

postgraphile(
    globalConfig.db.url({admin: true}),
    "app_public",
    {
        ...postGraphileOptions,
        exportGqlSchemaPath: `${path}.graphql`,
        exportJsonSchemaPath: `${path}.json`,
        writeCache: `${path}.cache.json`
    }
)