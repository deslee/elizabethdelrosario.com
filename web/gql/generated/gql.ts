/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
    "\n  query site {\n    site {\n      data {\n        id\n        attributes {\n          Title\n        }\n      }\n    }\n    categories {\n      data {\n        id\n        attributes {\n          Name\n          Description\n          Slug\n        }\n      }\n    }\n  }\n": types.SiteDocument,
    "\n  query frontPage {\n    frontPage {\n      data {\n        id\n        attributes {\n          Title\n        }\n      }\n    }\n  }\n": types.FrontPageDocument,
    "\n  fragment UploadFile on UploadFile {\n    name\n    alternativeText\n    caption\n    width\n    height\n    formats\n    hash\n    ext\n    mime\n    size\n    url\n    previewUrl\n    provider\n  }\n": types.UploadFileFragmentDoc,
    "\n  fragment Post on Post {\n    Title\n    Slug\n    Content\n    Type\n    Media {\n      data {\n        id\n        attributes {\n          ...UploadFile\n        }\n      }\n    }\n  }\n": types.PostFragmentDoc,
    "\n  query post($slug: String!) {\n    posts(filters: { Slug: { eq: $slug } }) {\n      data {\n        id\n        attributes {\n          ...Post\n        }\n      }\n    }\n  }\n": types.PostDocument,
    "\n  query category($id: ID!) {\n    category(id: $id) {\n      data {\n        id\n        attributes {\n          Name\n          Slug\n          Description\n          posts {\n            data {\n              id\n              attributes {\n                ...Post\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n": types.CategoryDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query site {\n    site {\n      data {\n        id\n        attributes {\n          Title\n        }\n      }\n    }\n    categories {\n      data {\n        id\n        attributes {\n          Name\n          Description\n          Slug\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query site {\n    site {\n      data {\n        id\n        attributes {\n          Title\n        }\n      }\n    }\n    categories {\n      data {\n        id\n        attributes {\n          Name\n          Description\n          Slug\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query frontPage {\n    frontPage {\n      data {\n        id\n        attributes {\n          Title\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query frontPage {\n    frontPage {\n      data {\n        id\n        attributes {\n          Title\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment UploadFile on UploadFile {\n    name\n    alternativeText\n    caption\n    width\n    height\n    formats\n    hash\n    ext\n    mime\n    size\n    url\n    previewUrl\n    provider\n  }\n"): (typeof documents)["\n  fragment UploadFile on UploadFile {\n    name\n    alternativeText\n    caption\n    width\n    height\n    formats\n    hash\n    ext\n    mime\n    size\n    url\n    previewUrl\n    provider\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment Post on Post {\n    Title\n    Slug\n    Content\n    Type\n    Media {\n      data {\n        id\n        attributes {\n          ...UploadFile\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment Post on Post {\n    Title\n    Slug\n    Content\n    Type\n    Media {\n      data {\n        id\n        attributes {\n          ...UploadFile\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query post($slug: String!) {\n    posts(filters: { Slug: { eq: $slug } }) {\n      data {\n        id\n        attributes {\n          ...Post\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query post($slug: String!) {\n    posts(filters: { Slug: { eq: $slug } }) {\n      data {\n        id\n        attributes {\n          ...Post\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query category($id: ID!) {\n    category(id: $id) {\n      data {\n        id\n        attributes {\n          Name\n          Slug\n          Description\n          posts {\n            data {\n              id\n              attributes {\n                ...Post\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query category($id: ID!) {\n    category(id: $id) {\n      data {\n        id\n        attributes {\n          Name\n          Slug\n          Description\n          posts {\n            data {\n              id\n              attributes {\n                ...Post\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"];

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
**/
export function graphql(source: string): unknown;

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;