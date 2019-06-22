import { PostGraphileOptions } from 'postgraphile';
import PgSimplifyInflectorPlugin from '@graphile-contrib/pg-simplify-inflector';
import globalConfig from '../globalConfig'
import { resolveUpload } from './uploadFileResolver';
import { PgMutationUpsertPlugin } from 'postgraphile-upsert-plugin';
import { extendSchemaWithLogin } from './authenticationSchema';
import wrapRootMutationsPlugin from './wrapRootMutationsPlugin';
const PostGraphileUploadFieldPlugin = require("postgraphile-plugin-upload-field");

export default {
  appendPlugins: [
    PgSimplifyInflectorPlugin, // simplified field names
    PostGraphileUploadFieldPlugin,
    PgMutationUpsertPlugin,
    extendSchemaWithLogin,
    wrapRootMutationsPlugin
  ],
  dynamicJson: true,
  showErrorStack: globalConfig.env !== 'production',
  extendedErrors: globalConfig.env !== 'production' ? ['hint'] : [],
  graphiql: false,
  simpleCollections: 'only',
  legacyRelations: 'omit',
  graphileBuildOptions: {
    pgOmitListSuffix: true,
    uploadFieldDefinitions: [
      {
        match: ({ table, column, tags }) => tags.graphqluploaduri,
        resolve: resolveUpload,
      },
    ],
  }
} as PostGraphileOptions;