
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: {
    'http://localhost:1337/graphql': {
      headers: {
        'Authorization': 'Bearer 6cde66dc6860c39e4e642c4744bb2131c1566641d7045b13395fd7b7bf0dcf2937374bb2c59ba5ce65b04ef25adfa31f576fd26f8750bd26a1b7ff26c9457196cf7e7f66a4d7f10d86cf18d8a1a5e466c1c94f32c3d45d5a999b5b950de8908dba6b82ba8cb6c1e1c5adedbf25ef1d68a4d929c23f3f92cce316eaa3bce7f26c'
      }
    }
  },
  documents: [
    "src/**/*.ts",
    "src/**/*.tsx"
  ],
  generates: {
    "src/gql/": {
      preset: "client",
      plugins: []
    },
    './gql/introspection.json': {
      plugins: ['introspection']
    }
  }
};

export default config;
