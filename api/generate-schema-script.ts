import globalConfig from './src/globalConfig'
import postgraphile from 'postgraphile';
import postGraphileOptions from './src/services/postGraphileOptions';

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