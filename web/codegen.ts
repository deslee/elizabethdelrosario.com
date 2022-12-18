import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: {
    'http://localhost:1337/graphql': {
      headers: {
        'Authorization': 'Bearer ae3e211b25b495e0eb5707708d89c68220d97614170561651ba0448b3cf2b7c760234a11ba7fc2be9d9a6561213f90b1210e9624cea43a91c8dd3f8c11f5d79346ce3157ae3c2d5955a9a29e6c892256fcb47ec76c03d5651239fdfa003e6019031578bd5270afdaf1db19b5f1a829a1cbd2fb08b1c0b81b827ed2bd88e8dad2'
      }
    }
  },
  documents: ['components/**/*.tsx', 'queries/**/*.ts'],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    './gql/generated/': {
      preset: 'client',
      plugins: [],
    },
    './gql/generated/introspection.json': {
      plugins: ['introspection']
    }
  },
};

export default config;
