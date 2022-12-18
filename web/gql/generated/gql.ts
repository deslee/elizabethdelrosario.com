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
    "\n  fragment CategoryFragment on Category {\n    Name\n    Description\n    Slug\n    posts {\n      data {\n        id\n        attributes {\n          ...PostFragment\n        }\n      }\n    }\n  }\n": types.CategoryFragmentFragmentDoc,
    "\n  fragment Layout_QueryFragment on Query {\n    site {\n      data {\n        id\n        attributes {\n          Title\n          Subtitle\n          Footer\n          Header {\n            data {\n              attributes {\n                url\n                alternativeText\n                placeholder\n              }\n            }\n          }\n        }\n      }\n    }\n    categories {\n      data {\n        id\n        attributes {\n          Name\n          Slug\n        }\n      }\n    }\n  }\n": types.Layout_QueryFragmentFragmentDoc,
    "\n  fragment MediaFragment on UploadFile {\n    url\n    previewUrl\n    width\n    height\n    mime\n    placeholder\n    alternativeText\n  }\n": types.MediaFragmentFragmentDoc,
    "\n  fragment PostFragment on Post {\n    Title\n    Slug\n    Sections {\n      ...SectionFragment\n    }\n  }\n": types.PostFragmentFragmentDoc,
    "\n  fragment SectionFragment on ComponentLayoutSection {\n    Title\n    Description\n    Media {\n      data {\n        id\n        attributes {\n          ...MediaFragment\n        }\n      }\n    }\n  }\n": types.SectionFragmentFragmentDoc,
    "\n  query SlugPage_Query($slug: String!) {\n    ...Layout_QueryFragment\n    categoriesBySlug: categories(filters: { Slug: { eq: $slug } }) {\n      data {\n        id\n        attributes {\n          ...CategoryFragment\n        }\n      }\n    }\n    postsBySlug: posts(filters: { Slug: { eq: $slug } }) {\n      data {\n        id\n        attributes {\n          ...PostFragment\n        }\n      }\n    }\n  }\n": types.SlugPage_QueryDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment CategoryFragment on Category {\n    Name\n    Description\n    Slug\n    posts {\n      data {\n        id\n        attributes {\n          ...PostFragment\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment CategoryFragment on Category {\n    Name\n    Description\n    Slug\n    posts {\n      data {\n        id\n        attributes {\n          ...PostFragment\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment Layout_QueryFragment on Query {\n    site {\n      data {\n        id\n        attributes {\n          Title\n          Subtitle\n          Footer\n          Header {\n            data {\n              attributes {\n                url\n                alternativeText\n                placeholder\n              }\n            }\n          }\n        }\n      }\n    }\n    categories {\n      data {\n        id\n        attributes {\n          Name\n          Slug\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment Layout_QueryFragment on Query {\n    site {\n      data {\n        id\n        attributes {\n          Title\n          Subtitle\n          Footer\n          Header {\n            data {\n              attributes {\n                url\n                alternativeText\n                placeholder\n              }\n            }\n          }\n        }\n      }\n    }\n    categories {\n      data {\n        id\n        attributes {\n          Name\n          Slug\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment MediaFragment on UploadFile {\n    url\n    previewUrl\n    width\n    height\n    mime\n    placeholder\n    alternativeText\n  }\n"): (typeof documents)["\n  fragment MediaFragment on UploadFile {\n    url\n    previewUrl\n    width\n    height\n    mime\n    placeholder\n    alternativeText\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment PostFragment on Post {\n    Title\n    Slug\n    Sections {\n      ...SectionFragment\n    }\n  }\n"): (typeof documents)["\n  fragment PostFragment on Post {\n    Title\n    Slug\n    Sections {\n      ...SectionFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment SectionFragment on ComponentLayoutSection {\n    Title\n    Description\n    Media {\n      data {\n        id\n        attributes {\n          ...MediaFragment\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment SectionFragment on ComponentLayoutSection {\n    Title\n    Description\n    Media {\n      data {\n        id\n        attributes {\n          ...MediaFragment\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query SlugPage_Query($slug: String!) {\n    ...Layout_QueryFragment\n    categoriesBySlug: categories(filters: { Slug: { eq: $slug } }) {\n      data {\n        id\n        attributes {\n          ...CategoryFragment\n        }\n      }\n    }\n    postsBySlug: posts(filters: { Slug: { eq: $slug } }) {\n      data {\n        id\n        attributes {\n          ...PostFragment\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query SlugPage_Query($slug: String!) {\n    ...Layout_QueryFragment\n    categoriesBySlug: categories(filters: { Slug: { eq: $slug } }) {\n      data {\n        id\n        attributes {\n          ...CategoryFragment\n        }\n      }\n    }\n    postsBySlug: posts(filters: { Slug: { eq: $slug } }) {\n      data {\n        id\n        attributes {\n          ...PostFragment\n        }\n      }\n    }\n  }\n"];

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