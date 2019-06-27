import gql from "graphql-tag";
import * as React from "react";
import * as ReactApollo from "react-apollo";
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the
   * `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO
   * 8601 standard for representation of dates and times using the Gregorian calendar.
   */
  DateTime: any;
  /** A date string, such as 2007-12-03, compliant with the `full-date` format
   * outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for
   * representation of dates and times using the Gregorian calendar.
   */
  Date: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
};

export type Block = {
  __typename?: "Block";
  _key?: Maybe<Scalars["String"]>;
  _type?: Maybe<Scalars["String"]>;
  children?: Maybe<Array<Maybe<Span>>>;
  style?: Maybe<Scalars["String"]>;
  list?: Maybe<Scalars["String"]>;
};

export type BlockOrFileAssetOrMultipleImagesOrPdfEmbedOrPostImageOrVideoAsset =
  | Block
  | FileAsset
  | MultipleImages
  | PdfEmbed
  | PostImage
  | VideoAsset;

/** A Sanity document */
export type Document = {
  /** Document ID */
  _id: Scalars["ID"];
  /** Document type */
  _type: Scalars["String"];
  /** Date the document was created */
  _createdAt: Scalars["DateTime"];
  /** Date the document was last modified */
  _updatedAt: Scalars["DateTime"];
  /** Current document revision */
  _rev: Scalars["String"];
};

export type File = {
  __typename?: "File";
  _key?: Maybe<Scalars["String"]>;
  _type?: Maybe<Scalars["String"]>;
  asset?: Maybe<SanityFileAsset>;
};

export type FileAsset = {
  __typename?: "FileAsset";
  _key?: Maybe<Scalars["String"]>;
  _type?: Maybe<Scalars["String"]>;
  file?: Maybe<File>;
  text?: Maybe<Scalars["String"]>;
};

export type Geopoint = {
  __typename?: "Geopoint";
  _key?: Maybe<Scalars["String"]>;
  _type?: Maybe<Scalars["String"]>;
  lat?: Maybe<Scalars["Float"]>;
  lng?: Maybe<Scalars["Float"]>;
  alt?: Maybe<Scalars["Float"]>;
};

export type Image = {
  __typename?: "Image";
  _key?: Maybe<Scalars["String"]>;
  _type?: Maybe<Scalars["String"]>;
  asset?: Maybe<SanityImageAsset>;
  hotspot?: Maybe<SanityImageHotspot>;
  crop?: Maybe<SanityImageCrop>;
};

export type MultipleImages = {
  __typename?: "MultipleImages";
  _key?: Maybe<Scalars["String"]>;
  _type?: Maybe<Scalars["String"]>;
  images?: Maybe<Array<Maybe<PostImage>>>;
  /** Number of columns. Set to blank for default */
  columns?: Maybe<Scalars["String"]>;
};

export type Page = Document & {
  __typename?: "Page";
  /** Document ID */
  _id: Scalars["ID"];
  /** Document type */
  _type: Scalars["String"];
  /** Date the document was created */
  _createdAt: Scalars["DateTime"];
  /** Date the document was last modified */
  _updatedAt: Scalars["DateTime"];
  /** Current document revision */
  _rev: Scalars["String"];
  _key?: Maybe<Scalars["String"]>;
  title?: Maybe<Scalars["String"]>;
  slug?: Maybe<Slug>;
  contentRaw?: Maybe<Scalars["JSON"]>;
};

export type PageFilter = {
  /** All documents that are equal to given value */
  _id?: Maybe<Scalars["ID"]>;
  /** All documents that are not equal to given value */
  _id_not?: Maybe<Scalars["ID"]>;
  /** All documents contain (match) the given word/words */
  _id_matches?: Maybe<Scalars["String"]>;
  _id_in?: Maybe<Array<Scalars["String"]>>;
  _id_not_in?: Maybe<Array<Scalars["String"]>>;
  /** All documents that are equal to given value */
  _type?: Maybe<Scalars["String"]>;
  /** All documents that are not equal to given value */
  _type_not?: Maybe<Scalars["String"]>;
  /** All documents contain (match) the given word/words */
  _type_matches?: Maybe<Scalars["String"]>;
  _type_in?: Maybe<Array<Scalars["String"]>>;
  _type_not_in?: Maybe<Array<Scalars["String"]>>;
  /** All documents that are equal to given value */
  _createdAt?: Maybe<Scalars["DateTime"]>;
  /** All documents that are not equal to given value */
  _createdAt_not?: Maybe<Scalars["DateTime"]>;
  /** All documents are less than given value */
  _createdAt_lt?: Maybe<Scalars["DateTime"]>;
  /** All documents are less than or equal to given value */
  _createdAt_lte?: Maybe<Scalars["DateTime"]>;
  /** All documents are greater than given value */
  _createdAt_gt?: Maybe<Scalars["DateTime"]>;
  /** All documents are greater than or equal to given value */
  _createdAt_gte?: Maybe<Scalars["DateTime"]>;
  /** All documents that are equal to given value */
  _updatedAt?: Maybe<Scalars["DateTime"]>;
  /** All documents that are not equal to given value */
  _updatedAt_not?: Maybe<Scalars["DateTime"]>;
  /** All documents are less than given value */
  _updatedAt_lt?: Maybe<Scalars["DateTime"]>;
  /** All documents are less than or equal to given value */
  _updatedAt_lte?: Maybe<Scalars["DateTime"]>;
  /** All documents are greater than given value */
  _updatedAt_gt?: Maybe<Scalars["DateTime"]>;
  /** All documents are greater than or equal to given value */
  _updatedAt_gte?: Maybe<Scalars["DateTime"]>;
  /** All documents that are equal to given value */
  _rev?: Maybe<Scalars["String"]>;
  /** All documents that are not equal to given value */
  _rev_not?: Maybe<Scalars["String"]>;
  /** All documents contain (match) the given word/words */
  _rev_matches?: Maybe<Scalars["String"]>;
  _rev_in?: Maybe<Array<Scalars["String"]>>;
  _rev_not_in?: Maybe<Array<Scalars["String"]>>;
  /** All documents that are equal to given value */
  _key?: Maybe<Scalars["String"]>;
  /** All documents that are not equal to given value */
  _key_not?: Maybe<Scalars["String"]>;
  /** All documents contain (match) the given word/words */
  _key_matches?: Maybe<Scalars["String"]>;
  _key_in?: Maybe<Array<Scalars["String"]>>;
  _key_not_in?: Maybe<Array<Scalars["String"]>>;
  /** All documents that are equal to given value */
  title?: Maybe<Scalars["String"]>;
  /** All documents that are not equal to given value */
  title_not?: Maybe<Scalars["String"]>;
  /** All documents contain (match) the given word/words */
  title_matches?: Maybe<Scalars["String"]>;
  title_in?: Maybe<Array<Scalars["String"]>>;
  title_not_in?: Maybe<Array<Scalars["String"]>>;
  /** All documents that are drafts */
  is_draft?: Maybe<Scalars["Boolean"]>;
};

export type PageOrPostOrPostCollection = Page | Post | PostCollection;

export type PdfEmbed = {
  __typename?: "PdfEmbed";
  _key?: Maybe<Scalars["String"]>;
  _type?: Maybe<Scalars["String"]>;
  asset?: Maybe<SanityFileAsset>;
};

export type Post = Document & {
  __typename?: "Post";
  /** Document ID */
  _id: Scalars["ID"];
  /** Document type */
  _type: Scalars["String"];
  /** Date the document was created */
  _createdAt: Scalars["DateTime"];
  /** Date the document was last modified */
  _updatedAt: Scalars["DateTime"];
  /** Current document revision */
  _rev: Scalars["String"];
  _key?: Maybe<Scalars["String"]>;
  title?: Maybe<Scalars["String"]>;
  slug?: Maybe<Slug>;
  /** Optional password protect */
  password?: Maybe<Scalars["String"]>;
  date?: Maybe<Scalars["Date"]>;
  categories?: Maybe<Array<Maybe<Scalars["String"]>>>;
  contentRaw?: Maybe<Scalars["JSON"]>;
};

export type PostCollection = Document & {
  __typename?: "PostCollection";
  /** Document ID */
  _id: Scalars["ID"];
  /** Document type */
  _type: Scalars["String"];
  /** Date the document was created */
  _createdAt: Scalars["DateTime"];
  /** Date the document was last modified */
  _updatedAt: Scalars["DateTime"];
  /** Current document revision */
  _rev: Scalars["String"];
  _key?: Maybe<Scalars["String"]>;
  title?: Maybe<Scalars["String"]>;
  slug?: Maybe<Slug>;
  /** This will go above the posts */
  contentRaw?: Maybe<Scalars["JSON"]>;
  /** Number of posts to show per page */
  showPerPage?: Maybe<Scalars["Float"]>;
  posts?: Maybe<Array<Maybe<Post>>>;
};

export type PostCollectionFilter = {
  /** All documents that are equal to given value */
  _id?: Maybe<Scalars["ID"]>;
  /** All documents that are not equal to given value */
  _id_not?: Maybe<Scalars["ID"]>;
  /** All documents contain (match) the given word/words */
  _id_matches?: Maybe<Scalars["String"]>;
  _id_in?: Maybe<Array<Scalars["String"]>>;
  _id_not_in?: Maybe<Array<Scalars["String"]>>;
  /** All documents that are equal to given value */
  _type?: Maybe<Scalars["String"]>;
  /** All documents that are not equal to given value */
  _type_not?: Maybe<Scalars["String"]>;
  /** All documents contain (match) the given word/words */
  _type_matches?: Maybe<Scalars["String"]>;
  _type_in?: Maybe<Array<Scalars["String"]>>;
  _type_not_in?: Maybe<Array<Scalars["String"]>>;
  /** All documents that are equal to given value */
  _createdAt?: Maybe<Scalars["DateTime"]>;
  /** All documents that are not equal to given value */
  _createdAt_not?: Maybe<Scalars["DateTime"]>;
  /** All documents are less than given value */
  _createdAt_lt?: Maybe<Scalars["DateTime"]>;
  /** All documents are less than or equal to given value */
  _createdAt_lte?: Maybe<Scalars["DateTime"]>;
  /** All documents are greater than given value */
  _createdAt_gt?: Maybe<Scalars["DateTime"]>;
  /** All documents are greater than or equal to given value */
  _createdAt_gte?: Maybe<Scalars["DateTime"]>;
  /** All documents that are equal to given value */
  _updatedAt?: Maybe<Scalars["DateTime"]>;
  /** All documents that are not equal to given value */
  _updatedAt_not?: Maybe<Scalars["DateTime"]>;
  /** All documents are less than given value */
  _updatedAt_lt?: Maybe<Scalars["DateTime"]>;
  /** All documents are less than or equal to given value */
  _updatedAt_lte?: Maybe<Scalars["DateTime"]>;
  /** All documents are greater than given value */
  _updatedAt_gt?: Maybe<Scalars["DateTime"]>;
  /** All documents are greater than or equal to given value */
  _updatedAt_gte?: Maybe<Scalars["DateTime"]>;
  /** All documents that are equal to given value */
  _rev?: Maybe<Scalars["String"]>;
  /** All documents that are not equal to given value */
  _rev_not?: Maybe<Scalars["String"]>;
  /** All documents contain (match) the given word/words */
  _rev_matches?: Maybe<Scalars["String"]>;
  _rev_in?: Maybe<Array<Scalars["String"]>>;
  _rev_not_in?: Maybe<Array<Scalars["String"]>>;
  /** All documents that are equal to given value */
  _key?: Maybe<Scalars["String"]>;
  /** All documents that are not equal to given value */
  _key_not?: Maybe<Scalars["String"]>;
  /** All documents contain (match) the given word/words */
  _key_matches?: Maybe<Scalars["String"]>;
  _key_in?: Maybe<Array<Scalars["String"]>>;
  _key_not_in?: Maybe<Array<Scalars["String"]>>;
  /** All documents that are equal to given value */
  title?: Maybe<Scalars["String"]>;
  /** All documents that are not equal to given value */
  title_not?: Maybe<Scalars["String"]>;
  /** All documents contain (match) the given word/words */
  title_matches?: Maybe<Scalars["String"]>;
  title_in?: Maybe<Array<Scalars["String"]>>;
  title_not_in?: Maybe<Array<Scalars["String"]>>;
  /** All documents that are equal to given value */
  showPerPage?: Maybe<Scalars["Float"]>;
  /** All documents that are not equal to given value */
  showPerPage_not?: Maybe<Scalars["Float"]>;
  /** All documents are less than given value */
  showPerPage_lt?: Maybe<Scalars["Float"]>;
  /** All documents are less than or equal to given value */
  showPerPage_lte?: Maybe<Scalars["Float"]>;
  /** All documents are greater than given value */
  showPerPage_gt?: Maybe<Scalars["Float"]>;
  /** All documents are greater than or equal to given value */
  showPerPage_gte?: Maybe<Scalars["Float"]>;
  /** All documents that are drafts */
  is_draft?: Maybe<Scalars["Boolean"]>;
};

export type PostFilter = {
  /** All documents that are equal to given value */
  _id?: Maybe<Scalars["ID"]>;
  /** All documents that are not equal to given value */
  _id_not?: Maybe<Scalars["ID"]>;
  /** All documents contain (match) the given word/words */
  _id_matches?: Maybe<Scalars["String"]>;
  _id_in?: Maybe<Array<Scalars["String"]>>;
  _id_not_in?: Maybe<Array<Scalars["String"]>>;
  /** All documents that are equal to given value */
  _type?: Maybe<Scalars["String"]>;
  /** All documents that are not equal to given value */
  _type_not?: Maybe<Scalars["String"]>;
  /** All documents contain (match) the given word/words */
  _type_matches?: Maybe<Scalars["String"]>;
  _type_in?: Maybe<Array<Scalars["String"]>>;
  _type_not_in?: Maybe<Array<Scalars["String"]>>;
  /** All documents that are equal to given value */
  _createdAt?: Maybe<Scalars["DateTime"]>;
  /** All documents that are not equal to given value */
  _createdAt_not?: Maybe<Scalars["DateTime"]>;
  /** All documents are less than given value */
  _createdAt_lt?: Maybe<Scalars["DateTime"]>;
  /** All documents are less than or equal to given value */
  _createdAt_lte?: Maybe<Scalars["DateTime"]>;
  /** All documents are greater than given value */
  _createdAt_gt?: Maybe<Scalars["DateTime"]>;
  /** All documents are greater than or equal to given value */
  _createdAt_gte?: Maybe<Scalars["DateTime"]>;
  /** All documents that are equal to given value */
  _updatedAt?: Maybe<Scalars["DateTime"]>;
  /** All documents that are not equal to given value */
  _updatedAt_not?: Maybe<Scalars["DateTime"]>;
  /** All documents are less than given value */
  _updatedAt_lt?: Maybe<Scalars["DateTime"]>;
  /** All documents are less than or equal to given value */
  _updatedAt_lte?: Maybe<Scalars["DateTime"]>;
  /** All documents are greater than given value */
  _updatedAt_gt?: Maybe<Scalars["DateTime"]>;
  /** All documents are greater than or equal to given value */
  _updatedAt_gte?: Maybe<Scalars["DateTime"]>;
  /** All documents that are equal to given value */
  _rev?: Maybe<Scalars["String"]>;
  /** All documents that are not equal to given value */
  _rev_not?: Maybe<Scalars["String"]>;
  /** All documents contain (match) the given word/words */
  _rev_matches?: Maybe<Scalars["String"]>;
  _rev_in?: Maybe<Array<Scalars["String"]>>;
  _rev_not_in?: Maybe<Array<Scalars["String"]>>;
  /** All documents that are equal to given value */
  _key?: Maybe<Scalars["String"]>;
  /** All documents that are not equal to given value */
  _key_not?: Maybe<Scalars["String"]>;
  /** All documents contain (match) the given word/words */
  _key_matches?: Maybe<Scalars["String"]>;
  _key_in?: Maybe<Array<Scalars["String"]>>;
  _key_not_in?: Maybe<Array<Scalars["String"]>>;
  /** All documents that are equal to given value */
  title?: Maybe<Scalars["String"]>;
  /** All documents that are not equal to given value */
  title_not?: Maybe<Scalars["String"]>;
  /** All documents contain (match) the given word/words */
  title_matches?: Maybe<Scalars["String"]>;
  title_in?: Maybe<Array<Scalars["String"]>>;
  title_not_in?: Maybe<Array<Scalars["String"]>>;
  /** All documents that are equal to given value */
  password?: Maybe<Scalars["String"]>;
  /** All documents that are not equal to given value */
  password_not?: Maybe<Scalars["String"]>;
  /** All documents contain (match) the given word/words */
  password_matches?: Maybe<Scalars["String"]>;
  password_in?: Maybe<Array<Scalars["String"]>>;
  password_not_in?: Maybe<Array<Scalars["String"]>>;
  /** All documents that are equal to given value */
  date?: Maybe<Scalars["Date"]>;
  /** All documents that are not equal to given value */
  date_not?: Maybe<Scalars["Date"]>;
  /** All documents are less than given value */
  date_lt?: Maybe<Scalars["Date"]>;
  /** All documents are less than or equal to given value */
  date_lte?: Maybe<Scalars["Date"]>;
  /** All documents are greater than given value */
  date_gt?: Maybe<Scalars["Date"]>;
  /** All documents are greater than or equal to given value */
  date_gte?: Maybe<Scalars["Date"]>;
  /** All documents that are drafts */
  is_draft?: Maybe<Scalars["Boolean"]>;
};

export type PostImage = {
  __typename?: "PostImage";
  _key?: Maybe<Scalars["String"]>;
  _type?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
  asset?: Maybe<SanityImageAsset>;
  hotspot?: Maybe<SanityImageHotspot>;
  crop?: Maybe<SanityImageCrop>;
};

export type RootQuery = {
  __typename?: "RootQuery";
  Post?: Maybe<Post>;
  Page?: Maybe<Page>;
  PostCollection?: Maybe<PostCollection>;
  SiteSettings?: Maybe<SiteSettings>;
  SanityImageAsset?: Maybe<SanityImageAsset>;
  SanityFileAsset?: Maybe<SanityFileAsset>;
  allPosts: Array<Post>;
  allPages: Array<Page>;
  allPostCollections: Array<PostCollection>;
  allSiteSettings: Array<SiteSettings>;
  allSanityImageAssets: Array<SanityImageAsset>;
  allSanityFileAssets: Array<SanityFileAsset>;
};

export type RootQueryPostArgs = {
  id: Scalars["ID"];
};

export type RootQueryPageArgs = {
  id: Scalars["ID"];
};

export type RootQueryPostCollectionArgs = {
  id: Scalars["ID"];
};

export type RootQuerySiteSettingsArgs = {
  id: Scalars["ID"];
};

export type RootQuerySanityImageAssetArgs = {
  id: Scalars["ID"];
};

export type RootQuerySanityFileAssetArgs = {
  id: Scalars["ID"];
};

export type RootQueryAllPostsArgs = {
  where?: Maybe<PostFilter>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
};

export type RootQueryAllPagesArgs = {
  where?: Maybe<PageFilter>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
};

export type RootQueryAllPostCollectionsArgs = {
  where?: Maybe<PostCollectionFilter>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
};

export type RootQueryAllSiteSettingsArgs = {
  where?: Maybe<SiteSettingsFilter>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
};

export type RootQueryAllSanityImageAssetsArgs = {
  where?: Maybe<SanityImageAssetFilter>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
};

export type RootQueryAllSanityFileAssetsArgs = {
  where?: Maybe<SanityFileAssetFilter>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
};

export type SanityFileAsset = Document & {
  __typename?: "SanityFileAsset";
  /** Document ID */
  _id: Scalars["ID"];
  /** Document type */
  _type: Scalars["String"];
  /** Date the document was created */
  _createdAt: Scalars["DateTime"];
  /** Date the document was last modified */
  _updatedAt: Scalars["DateTime"];
  /** Current document revision */
  _rev: Scalars["String"];
  _key?: Maybe<Scalars["String"]>;
  originalFilename?: Maybe<Scalars["String"]>;
  label?: Maybe<Scalars["String"]>;
  sha1hash?: Maybe<Scalars["String"]>;
  extension?: Maybe<Scalars["String"]>;
  mimeType?: Maybe<Scalars["String"]>;
  size?: Maybe<Scalars["Float"]>;
  assetId?: Maybe<Scalars["String"]>;
  path?: Maybe<Scalars["String"]>;
  url?: Maybe<Scalars["String"]>;
};

export type SanityFileAssetFilter = {
  /** All documents that are equal to given value */
  _id?: Maybe<Scalars["ID"]>;
  /** All documents that are not equal to given value */
  _id_not?: Maybe<Scalars["ID"]>;
  /** All documents contain (match) the given word/words */
  _id_matches?: Maybe<Scalars["String"]>;
  _id_in?: Maybe<Array<Scalars["String"]>>;
  _id_not_in?: Maybe<Array<Scalars["String"]>>;
  /** All documents that are equal to given value */
  _type?: Maybe<Scalars["String"]>;
  /** All documents that are not equal to given value */
  _type_not?: Maybe<Scalars["String"]>;
  /** All documents contain (match) the given word/words */
  _type_matches?: Maybe<Scalars["String"]>;
  _type_in?: Maybe<Array<Scalars["String"]>>;
  _type_not_in?: Maybe<Array<Scalars["String"]>>;
  /** All documents that are equal to given value */
  _createdAt?: Maybe<Scalars["DateTime"]>;
  /** All documents that are not equal to given value */
  _createdAt_not?: Maybe<Scalars["DateTime"]>;
  /** All documents are less than given value */
  _createdAt_lt?: Maybe<Scalars["DateTime"]>;
  /** All documents are less than or equal to given value */
  _createdAt_lte?: Maybe<Scalars["DateTime"]>;
  /** All documents are greater than given value */
  _createdAt_gt?: Maybe<Scalars["DateTime"]>;
  /** All documents are greater than or equal to given value */
  _createdAt_gte?: Maybe<Scalars["DateTime"]>;
  /** All documents that are equal to given value */
  _updatedAt?: Maybe<Scalars["DateTime"]>;
  /** All documents that are not equal to given value */
  _updatedAt_not?: Maybe<Scalars["DateTime"]>;
  /** All documents are less than given value */
  _updatedAt_lt?: Maybe<Scalars["DateTime"]>;
  /** All documents are less than or equal to given value */
  _updatedAt_lte?: Maybe<Scalars["DateTime"]>;
  /** All documents are greater than given value */
  _updatedAt_gt?: Maybe<Scalars["DateTime"]>;
  /** All documents are greater than or equal to given value */
  _updatedAt_gte?: Maybe<Scalars["DateTime"]>;
  /** All documents that are equal to given value */
  _rev?: Maybe<Scalars["String"]>;
  /** All documents that are not equal to given value */
  _rev_not?: Maybe<Scalars["String"]>;
  /** All documents contain (match) the given word/words */
  _rev_matches?: Maybe<Scalars["String"]>;
  _rev_in?: Maybe<Array<Scalars["String"]>>;
  _rev_not_in?: Maybe<Array<Scalars["String"]>>;
  /** All documents that are equal to given value */
  _key?: Maybe<Scalars["String"]>;
  /** All documents that are not equal to given value */
  _key_not?: Maybe<Scalars["String"]>;
  /** All documents contain (match) the given word/words */
  _key_matches?: Maybe<Scalars["String"]>;
  _key_in?: Maybe<Array<Scalars["String"]>>;
  _key_not_in?: Maybe<Array<Scalars["String"]>>;
  /** All documents that are equal to given value */
  originalFilename?: Maybe<Scalars["String"]>;
  /** All documents that are not equal to given value */
  originalFilename_not?: Maybe<Scalars["String"]>;
  /** All documents contain (match) the given word/words */
  originalFilename_matches?: Maybe<Scalars["String"]>;
  originalFilename_in?: Maybe<Array<Scalars["String"]>>;
  originalFilename_not_in?: Maybe<Array<Scalars["String"]>>;
  /** All documents that are equal to given value */
  label?: Maybe<Scalars["String"]>;
  /** All documents that are not equal to given value */
  label_not?: Maybe<Scalars["String"]>;
  /** All documents contain (match) the given word/words */
  label_matches?: Maybe<Scalars["String"]>;
  label_in?: Maybe<Array<Scalars["String"]>>;
  label_not_in?: Maybe<Array<Scalars["String"]>>;
  /** All documents that are equal to given value */
  sha1hash?: Maybe<Scalars["String"]>;
  /** All documents that are not equal to given value */
  sha1hash_not?: Maybe<Scalars["String"]>;
  /** All documents contain (match) the given word/words */
  sha1hash_matches?: Maybe<Scalars["String"]>;
  sha1hash_in?: Maybe<Array<Scalars["String"]>>;
  sha1hash_not_in?: Maybe<Array<Scalars["String"]>>;
  /** All documents that are equal to given value */
  extension?: Maybe<Scalars["String"]>;
  /** All documents that are not equal to given value */
  extension_not?: Maybe<Scalars["String"]>;
  /** All documents contain (match) the given word/words */
  extension_matches?: Maybe<Scalars["String"]>;
  extension_in?: Maybe<Array<Scalars["String"]>>;
  extension_not_in?: Maybe<Array<Scalars["String"]>>;
  /** All documents that are equal to given value */
  mimeType?: Maybe<Scalars["String"]>;
  /** All documents that are not equal to given value */
  mimeType_not?: Maybe<Scalars["String"]>;
  /** All documents contain (match) the given word/words */
  mimeType_matches?: Maybe<Scalars["String"]>;
  mimeType_in?: Maybe<Array<Scalars["String"]>>;
  mimeType_not_in?: Maybe<Array<Scalars["String"]>>;
  /** All documents that are equal to given value */
  size?: Maybe<Scalars["Float"]>;
  /** All documents that are not equal to given value */
  size_not?: Maybe<Scalars["Float"]>;
  /** All documents are less than given value */
  size_lt?: Maybe<Scalars["Float"]>;
  /** All documents are less than or equal to given value */
  size_lte?: Maybe<Scalars["Float"]>;
  /** All documents are greater than given value */
  size_gt?: Maybe<Scalars["Float"]>;
  /** All documents are greater than or equal to given value */
  size_gte?: Maybe<Scalars["Float"]>;
  /** All documents that are equal to given value */
  assetId?: Maybe<Scalars["String"]>;
  /** All documents that are not equal to given value */
  assetId_not?: Maybe<Scalars["String"]>;
  /** All documents contain (match) the given word/words */
  assetId_matches?: Maybe<Scalars["String"]>;
  assetId_in?: Maybe<Array<Scalars["String"]>>;
  assetId_not_in?: Maybe<Array<Scalars["String"]>>;
  /** All documents that are equal to given value */
  path?: Maybe<Scalars["String"]>;
  /** All documents that are not equal to given value */
  path_not?: Maybe<Scalars["String"]>;
  /** All documents contain (match) the given word/words */
  path_matches?: Maybe<Scalars["String"]>;
  path_in?: Maybe<Array<Scalars["String"]>>;
  path_not_in?: Maybe<Array<Scalars["String"]>>;
  /** All documents that are equal to given value */
  url?: Maybe<Scalars["String"]>;
  /** All documents that are not equal to given value */
  url_not?: Maybe<Scalars["String"]>;
  /** All documents contain (match) the given word/words */
  url_matches?: Maybe<Scalars["String"]>;
  url_in?: Maybe<Array<Scalars["String"]>>;
  url_not_in?: Maybe<Array<Scalars["String"]>>;
  /** All documents that are drafts */
  is_draft?: Maybe<Scalars["Boolean"]>;
};

export type SanityImageAsset = Document & {
  __typename?: "SanityImageAsset";
  /** Document ID */
  _id: Scalars["ID"];
  /** Document type */
  _type: Scalars["String"];
  /** Date the document was created */
  _createdAt: Scalars["DateTime"];
  /** Date the document was last modified */
  _updatedAt: Scalars["DateTime"];
  /** Current document revision */
  _rev: Scalars["String"];
  _key?: Maybe<Scalars["String"]>;
  originalFilename?: Maybe<Scalars["String"]>;
  label?: Maybe<Scalars["String"]>;
  sha1hash?: Maybe<Scalars["String"]>;
  extension?: Maybe<Scalars["String"]>;
  mimeType?: Maybe<Scalars["String"]>;
  size?: Maybe<Scalars["Float"]>;
  assetId?: Maybe<Scalars["String"]>;
  path?: Maybe<Scalars["String"]>;
  url?: Maybe<Scalars["String"]>;
  metadata?: Maybe<SanityImageMetadata>;
};

export type SanityImageAssetFilter = {
  /** All documents that are equal to given value */
  _id?: Maybe<Scalars["ID"]>;
  /** All documents that are not equal to given value */
  _id_not?: Maybe<Scalars["ID"]>;
  /** All documents contain (match) the given word/words */
  _id_matches?: Maybe<Scalars["String"]>;
  _id_in?: Maybe<Array<Scalars["String"]>>;
  _id_not_in?: Maybe<Array<Scalars["String"]>>;
  /** All documents that are equal to given value */
  _type?: Maybe<Scalars["String"]>;
  /** All documents that are not equal to given value */
  _type_not?: Maybe<Scalars["String"]>;
  /** All documents contain (match) the given word/words */
  _type_matches?: Maybe<Scalars["String"]>;
  _type_in?: Maybe<Array<Scalars["String"]>>;
  _type_not_in?: Maybe<Array<Scalars["String"]>>;
  /** All documents that are equal to given value */
  _createdAt?: Maybe<Scalars["DateTime"]>;
  /** All documents that are not equal to given value */
  _createdAt_not?: Maybe<Scalars["DateTime"]>;
  /** All documents are less than given value */
  _createdAt_lt?: Maybe<Scalars["DateTime"]>;
  /** All documents are less than or equal to given value */
  _createdAt_lte?: Maybe<Scalars["DateTime"]>;
  /** All documents are greater than given value */
  _createdAt_gt?: Maybe<Scalars["DateTime"]>;
  /** All documents are greater than or equal to given value */
  _createdAt_gte?: Maybe<Scalars["DateTime"]>;
  /** All documents that are equal to given value */
  _updatedAt?: Maybe<Scalars["DateTime"]>;
  /** All documents that are not equal to given value */
  _updatedAt_not?: Maybe<Scalars["DateTime"]>;
  /** All documents are less than given value */
  _updatedAt_lt?: Maybe<Scalars["DateTime"]>;
  /** All documents are less than or equal to given value */
  _updatedAt_lte?: Maybe<Scalars["DateTime"]>;
  /** All documents are greater than given value */
  _updatedAt_gt?: Maybe<Scalars["DateTime"]>;
  /** All documents are greater than or equal to given value */
  _updatedAt_gte?: Maybe<Scalars["DateTime"]>;
  /** All documents that are equal to given value */
  _rev?: Maybe<Scalars["String"]>;
  /** All documents that are not equal to given value */
  _rev_not?: Maybe<Scalars["String"]>;
  /** All documents contain (match) the given word/words */
  _rev_matches?: Maybe<Scalars["String"]>;
  _rev_in?: Maybe<Array<Scalars["String"]>>;
  _rev_not_in?: Maybe<Array<Scalars["String"]>>;
  /** All documents that are equal to given value */
  _key?: Maybe<Scalars["String"]>;
  /** All documents that are not equal to given value */
  _key_not?: Maybe<Scalars["String"]>;
  /** All documents contain (match) the given word/words */
  _key_matches?: Maybe<Scalars["String"]>;
  _key_in?: Maybe<Array<Scalars["String"]>>;
  _key_not_in?: Maybe<Array<Scalars["String"]>>;
  /** All documents that are equal to given value */
  originalFilename?: Maybe<Scalars["String"]>;
  /** All documents that are not equal to given value */
  originalFilename_not?: Maybe<Scalars["String"]>;
  /** All documents contain (match) the given word/words */
  originalFilename_matches?: Maybe<Scalars["String"]>;
  originalFilename_in?: Maybe<Array<Scalars["String"]>>;
  originalFilename_not_in?: Maybe<Array<Scalars["String"]>>;
  /** All documents that are equal to given value */
  label?: Maybe<Scalars["String"]>;
  /** All documents that are not equal to given value */
  label_not?: Maybe<Scalars["String"]>;
  /** All documents contain (match) the given word/words */
  label_matches?: Maybe<Scalars["String"]>;
  label_in?: Maybe<Array<Scalars["String"]>>;
  label_not_in?: Maybe<Array<Scalars["String"]>>;
  /** All documents that are equal to given value */
  sha1hash?: Maybe<Scalars["String"]>;
  /** All documents that are not equal to given value */
  sha1hash_not?: Maybe<Scalars["String"]>;
  /** All documents contain (match) the given word/words */
  sha1hash_matches?: Maybe<Scalars["String"]>;
  sha1hash_in?: Maybe<Array<Scalars["String"]>>;
  sha1hash_not_in?: Maybe<Array<Scalars["String"]>>;
  /** All documents that are equal to given value */
  extension?: Maybe<Scalars["String"]>;
  /** All documents that are not equal to given value */
  extension_not?: Maybe<Scalars["String"]>;
  /** All documents contain (match) the given word/words */
  extension_matches?: Maybe<Scalars["String"]>;
  extension_in?: Maybe<Array<Scalars["String"]>>;
  extension_not_in?: Maybe<Array<Scalars["String"]>>;
  /** All documents that are equal to given value */
  mimeType?: Maybe<Scalars["String"]>;
  /** All documents that are not equal to given value */
  mimeType_not?: Maybe<Scalars["String"]>;
  /** All documents contain (match) the given word/words */
  mimeType_matches?: Maybe<Scalars["String"]>;
  mimeType_in?: Maybe<Array<Scalars["String"]>>;
  mimeType_not_in?: Maybe<Array<Scalars["String"]>>;
  /** All documents that are equal to given value */
  size?: Maybe<Scalars["Float"]>;
  /** All documents that are not equal to given value */
  size_not?: Maybe<Scalars["Float"]>;
  /** All documents are less than given value */
  size_lt?: Maybe<Scalars["Float"]>;
  /** All documents are less than or equal to given value */
  size_lte?: Maybe<Scalars["Float"]>;
  /** All documents are greater than given value */
  size_gt?: Maybe<Scalars["Float"]>;
  /** All documents are greater than or equal to given value */
  size_gte?: Maybe<Scalars["Float"]>;
  /** All documents that are equal to given value */
  assetId?: Maybe<Scalars["String"]>;
  /** All documents that are not equal to given value */
  assetId_not?: Maybe<Scalars["String"]>;
  /** All documents contain (match) the given word/words */
  assetId_matches?: Maybe<Scalars["String"]>;
  assetId_in?: Maybe<Array<Scalars["String"]>>;
  assetId_not_in?: Maybe<Array<Scalars["String"]>>;
  /** All documents that are equal to given value */
  path?: Maybe<Scalars["String"]>;
  /** All documents that are not equal to given value */
  path_not?: Maybe<Scalars["String"]>;
  /** All documents contain (match) the given word/words */
  path_matches?: Maybe<Scalars["String"]>;
  path_in?: Maybe<Array<Scalars["String"]>>;
  path_not_in?: Maybe<Array<Scalars["String"]>>;
  /** All documents that are equal to given value */
  url?: Maybe<Scalars["String"]>;
  /** All documents that are not equal to given value */
  url_not?: Maybe<Scalars["String"]>;
  /** All documents contain (match) the given word/words */
  url_matches?: Maybe<Scalars["String"]>;
  url_in?: Maybe<Array<Scalars["String"]>>;
  url_not_in?: Maybe<Array<Scalars["String"]>>;
  /** All documents that are drafts */
  is_draft?: Maybe<Scalars["Boolean"]>;
};

export type SanityImageCrop = {
  __typename?: "SanityImageCrop";
  _key?: Maybe<Scalars["String"]>;
  _type?: Maybe<Scalars["String"]>;
  top?: Maybe<Scalars["Float"]>;
  bottom?: Maybe<Scalars["Float"]>;
  left?: Maybe<Scalars["Float"]>;
  right?: Maybe<Scalars["Float"]>;
};

export type SanityImageDimensions = {
  __typename?: "SanityImageDimensions";
  _key?: Maybe<Scalars["String"]>;
  _type?: Maybe<Scalars["String"]>;
  height?: Maybe<Scalars["Float"]>;
  width?: Maybe<Scalars["Float"]>;
  aspectRatio?: Maybe<Scalars["Float"]>;
};

export type SanityImageHotspot = {
  __typename?: "SanityImageHotspot";
  _key?: Maybe<Scalars["String"]>;
  _type?: Maybe<Scalars["String"]>;
  x?: Maybe<Scalars["Float"]>;
  y?: Maybe<Scalars["Float"]>;
  height?: Maybe<Scalars["Float"]>;
  width?: Maybe<Scalars["Float"]>;
};

export type SanityImageMetadata = {
  __typename?: "SanityImageMetadata";
  _key?: Maybe<Scalars["String"]>;
  _type?: Maybe<Scalars["String"]>;
  location?: Maybe<Geopoint>;
  dimensions?: Maybe<SanityImageDimensions>;
  palette?: Maybe<SanityImagePalette>;
  lqip?: Maybe<Scalars["String"]>;
  hasAlpha?: Maybe<Scalars["Boolean"]>;
  isOpaque?: Maybe<Scalars["Boolean"]>;
};

export type SanityImagePalette = {
  __typename?: "SanityImagePalette";
  _key?: Maybe<Scalars["String"]>;
  _type?: Maybe<Scalars["String"]>;
  darkMuted?: Maybe<SanityImagePaletteSwatch>;
  lightVibrant?: Maybe<SanityImagePaletteSwatch>;
  darkVibrant?: Maybe<SanityImagePaletteSwatch>;
  vibrant?: Maybe<SanityImagePaletteSwatch>;
  dominant?: Maybe<SanityImagePaletteSwatch>;
  lightMuted?: Maybe<SanityImagePaletteSwatch>;
  muted?: Maybe<SanityImagePaletteSwatch>;
};

export type SanityImagePaletteSwatch = {
  __typename?: "SanityImagePaletteSwatch";
  _key?: Maybe<Scalars["String"]>;
  _type?: Maybe<Scalars["String"]>;
  background?: Maybe<Scalars["String"]>;
  foreground?: Maybe<Scalars["String"]>;
  population?: Maybe<Scalars["Float"]>;
  title?: Maybe<Scalars["String"]>;
};

export type SiteFooter = {
  __typename?: "SiteFooter";
  _key?: Maybe<Scalars["String"]>;
  _type?: Maybe<Scalars["String"]>;
  contentRaw?: Maybe<Scalars["JSON"]>;
};

export type SiteHeader = {
  __typename?: "SiteHeader";
  _key?: Maybe<Scalars["String"]>;
  _type?: Maybe<Scalars["String"]>;
  headerImage?: Maybe<Image>;
  menuItems?: Maybe<Array<Maybe<SiteHeaderInternalReference>>>;
};

export type SiteHeaderExternalReference = {
  __typename?: "SiteHeaderExternalReference";
  _key?: Maybe<Scalars["String"]>;
  _type?: Maybe<Scalars["String"]>;
  url?: Maybe<Scalars["String"]>;
  title?: Maybe<Scalars["String"]>;
};

export type SiteHeaderInternalReference = {
  __typename?: "SiteHeaderInternalReference";
  _key?: Maybe<Scalars["String"]>;
  _type?: Maybe<Scalars["String"]>;
  /** Post, page, or collection */
  internal?: Maybe<PageOrPostOrPostCollection>;
  /** Optional. If empty, will use the item's title */
  title?: Maybe<Scalars["String"]>;
};

export type SiteSettings = Document & {
  __typename?: "SiteSettings";
  /** Document ID */
  _id: Scalars["ID"];
  /** Document type */
  _type: Scalars["String"];
  /** Date the document was created */
  _createdAt: Scalars["DateTime"];
  /** Date the document was last modified */
  _updatedAt: Scalars["DateTime"];
  /** Current document revision */
  _rev: Scalars["String"];
  _key?: Maybe<Scalars["String"]>;
  title?: Maybe<Scalars["String"]>;
  subtitleRaw?: Maybe<Scalars["JSON"]>;
  frontPage?: Maybe<PageOrPostOrPostCollection>;
  googleAnalyticsId?: Maybe<Scalars["String"]>;
  siteHeader?: Maybe<SiteHeader>;
  siteFooter?: Maybe<SiteFooter>;
};

export type SiteSettingsFilter = {
  /** All documents that are equal to given value */
  _id?: Maybe<Scalars["ID"]>;
  /** All documents that are not equal to given value */
  _id_not?: Maybe<Scalars["ID"]>;
  /** All documents contain (match) the given word/words */
  _id_matches?: Maybe<Scalars["String"]>;
  _id_in?: Maybe<Array<Scalars["String"]>>;
  _id_not_in?: Maybe<Array<Scalars["String"]>>;
  /** All documents that are equal to given value */
  _type?: Maybe<Scalars["String"]>;
  /** All documents that are not equal to given value */
  _type_not?: Maybe<Scalars["String"]>;
  /** All documents contain (match) the given word/words */
  _type_matches?: Maybe<Scalars["String"]>;
  _type_in?: Maybe<Array<Scalars["String"]>>;
  _type_not_in?: Maybe<Array<Scalars["String"]>>;
  /** All documents that are equal to given value */
  _createdAt?: Maybe<Scalars["DateTime"]>;
  /** All documents that are not equal to given value */
  _createdAt_not?: Maybe<Scalars["DateTime"]>;
  /** All documents are less than given value */
  _createdAt_lt?: Maybe<Scalars["DateTime"]>;
  /** All documents are less than or equal to given value */
  _createdAt_lte?: Maybe<Scalars["DateTime"]>;
  /** All documents are greater than given value */
  _createdAt_gt?: Maybe<Scalars["DateTime"]>;
  /** All documents are greater than or equal to given value */
  _createdAt_gte?: Maybe<Scalars["DateTime"]>;
  /** All documents that are equal to given value */
  _updatedAt?: Maybe<Scalars["DateTime"]>;
  /** All documents that are not equal to given value */
  _updatedAt_not?: Maybe<Scalars["DateTime"]>;
  /** All documents are less than given value */
  _updatedAt_lt?: Maybe<Scalars["DateTime"]>;
  /** All documents are less than or equal to given value */
  _updatedAt_lte?: Maybe<Scalars["DateTime"]>;
  /** All documents are greater than given value */
  _updatedAt_gt?: Maybe<Scalars["DateTime"]>;
  /** All documents are greater than or equal to given value */
  _updatedAt_gte?: Maybe<Scalars["DateTime"]>;
  /** All documents that are equal to given value */
  _rev?: Maybe<Scalars["String"]>;
  /** All documents that are not equal to given value */
  _rev_not?: Maybe<Scalars["String"]>;
  /** All documents contain (match) the given word/words */
  _rev_matches?: Maybe<Scalars["String"]>;
  _rev_in?: Maybe<Array<Scalars["String"]>>;
  _rev_not_in?: Maybe<Array<Scalars["String"]>>;
  /** All documents that are equal to given value */
  _key?: Maybe<Scalars["String"]>;
  /** All documents that are not equal to given value */
  _key_not?: Maybe<Scalars["String"]>;
  /** All documents contain (match) the given word/words */
  _key_matches?: Maybe<Scalars["String"]>;
  _key_in?: Maybe<Array<Scalars["String"]>>;
  _key_not_in?: Maybe<Array<Scalars["String"]>>;
  /** All documents that are equal to given value */
  title?: Maybe<Scalars["String"]>;
  /** All documents that are not equal to given value */
  title_not?: Maybe<Scalars["String"]>;
  /** All documents contain (match) the given word/words */
  title_matches?: Maybe<Scalars["String"]>;
  title_in?: Maybe<Array<Scalars["String"]>>;
  title_not_in?: Maybe<Array<Scalars["String"]>>;
  frontPage?: Maybe<Scalars["ID"]>;
  /** All documents that are equal to given value */
  googleAnalyticsId?: Maybe<Scalars["String"]>;
  /** All documents that are not equal to given value */
  googleAnalyticsId_not?: Maybe<Scalars["String"]>;
  /** All documents contain (match) the given word/words */
  googleAnalyticsId_matches?: Maybe<Scalars["String"]>;
  googleAnalyticsId_in?: Maybe<Array<Scalars["String"]>>;
  googleAnalyticsId_not_in?: Maybe<Array<Scalars["String"]>>;
  /** All documents that are drafts */
  is_draft?: Maybe<Scalars["Boolean"]>;
};

export type Slug = {
  __typename?: "Slug";
  _key?: Maybe<Scalars["String"]>;
  _type?: Maybe<Scalars["String"]>;
  current?: Maybe<Scalars["String"]>;
};

export type SocialMedia = {
  __typename?: "SocialMedia";
  _key?: Maybe<Scalars["String"]>;
  _type?: Maybe<Scalars["String"]>;
  url?: Maybe<Scalars["String"]>;
  icon?: Maybe<Scalars["String"]>;
};

export type Span = {
  __typename?: "Span";
  _key?: Maybe<Scalars["String"]>;
  _type?: Maybe<Scalars["String"]>;
  marks?: Maybe<Array<Maybe<Scalars["String"]>>>;
  text?: Maybe<Scalars["String"]>;
};

export type VideoAsset = {
  __typename?: "VideoAsset";
  _key?: Maybe<Scalars["String"]>;
  _type?: Maybe<Scalars["String"]>;
  url?: Maybe<Scalars["String"]>;
  autoplay?: Maybe<Scalars["Boolean"]>;
  loop?: Maybe<Scalars["Boolean"]>;
};
export type ImageFragment = { __typename?: "Image" } & {
  asset: Maybe<
    { __typename?: "SanityImageAsset" } & Pick<
      SanityImageAsset,
      "extension" | "label" | "size" | "assetId" | "path" | "url"
    >
  >;
  hotspot: Maybe<
    { __typename?: "SanityImageHotspot" } & Pick<
      SanityImageHotspot,
      "x" | "y" | "height" | "width"
    >
  >;
  crop: Maybe<
    { __typename?: "SanityImageCrop" } & Pick<
      SanityImageCrop,
      "top" | "bottom" | "left" | "right"
    >
  >;
};

export type PageFragment = { __typename?: "Page" } & Pick<
  Page,
  "title" | "contentRaw"
> & { slug: Maybe<{ __typename?: "Slug" } & Pick<Slug, "current">> };

export type PostFragment = { __typename?: "Post" } & Pick<
  Post,
  "title" | "password" | "date" | "categories" | "contentRaw"
> & { slug: Maybe<{ __typename?: "Slug" } & Pick<Slug, "current">> };

export type PostCollectionFragment = { __typename?: "PostCollection" } & Pick<
  PostCollection,
  "title" | "contentRaw" | "showPerPage"
> & {
    slug: Maybe<{ __typename?: "Slug" } & Pick<Slug, "current">>;
    posts: Maybe<Array<Maybe<{ __typename?: "Post" } & PostFragment>>>;
  };

export type MenuItemFragment = {
  __typename?: "SiteHeaderInternalReference";
} & ({ __typename?: "SiteHeaderInternalReference" } & Pick<
  SiteHeaderInternalReference,
  "title"
> & {
    internal: Maybe<

        | ({ __typename?: "Page" } & {
            slug: Maybe<{ __typename?: "Slug" } & Pick<Slug, "current">>;
          })
        | ({ __typename?: "Post" } & {
            slug: Maybe<{ __typename?: "Slug" } & Pick<Slug, "current">>;
          })
        | ({ __typename?: "PostCollection" } & {
            slug: Maybe<{ __typename?: "Slug" } & Pick<Slug, "current">>;
          })
    >;
  });

export type SiteSettingsFragment = { __typename?: "SiteSettings" } & Pick<
  SiteSettings,
  "title" | "subtitleRaw" | "googleAnalyticsId"
> & {
    frontPage: Maybe<

        | ({ __typename?: "Page" } & PageFragment)
        | ({ __typename?: "Post" } & PostFragment)
        | ({ __typename?: "PostCollection" } & PostCollectionFragment)
    >;
    siteHeader: Maybe<
      { __typename?: "SiteHeader" } & {
        headerImage: Maybe<{ __typename?: "Image" } & ImageFragment>;
        menuItems: Maybe<
          Array<
            Maybe<
              { __typename?: "SiteHeaderInternalReference" } & MenuItemFragment
            >
          >
        >;
      }
    >;
  };

export type AllSlugsQueryVariables = {};

export type AllSlugsQuery = { __typename?: "RootQuery" } & {
  postSlugs: Array<
    { __typename?: "Post" } & { id: Post["_id"] } & {
      slug: Maybe<{ __typename?: "Slug" } & Pick<Slug, "current">>;
    }
  >;
  pageSlugs: Array<
    { __typename?: "Page" } & { id: Page["_id"] } & {
      slug: Maybe<{ __typename?: "Slug" } & Pick<Slug, "current">>;
    }
  >;
  postCollectionSlugs: Array<
    { __typename?: "PostCollection" } & { id: PostCollection["_id"] } & {
      slug: Maybe<{ __typename?: "Slug" } & Pick<Slug, "current">>;
    }
  >;
};

export type IndexPageQueryVariables = {};

export type IndexPageQuery = { __typename?: "RootQuery" } & {
  posts: Array<{ __typename?: "Post" } & PostFragment>;
  siteSettings: Maybe<{ __typename?: "SiteSettings" } & SiteSettingsFragment>;
};

export type PostByIdQueryVariables = {
  id: Scalars["ID"];
};

export type PostByIdQuery = { __typename?: "RootQuery" } & {
  Post: Maybe<{ __typename?: "Post" } & PostFragment>;
};

export type PageByIdQueryVariables = {
  id: Scalars["ID"];
};

export type PageByIdQuery = { __typename?: "RootQuery" } & {
  Page: Maybe<{ __typename?: "Page" } & PageFragment>;
};

export type PostCollectionByIdQueryVariables = {
  id: Scalars["ID"];
};

export type PostCollectionByIdQuery = { __typename?: "RootQuery" } & {
  PostCollection: Maybe<
    { __typename?: "PostCollection" } & PostCollectionFragment
  >;
};
export const pageFragmentDoc = gql`
  fragment page on Page {
    title
    slug {
      current
    }
    contentRaw
  }
`;
export const postFragmentDoc = gql`
  fragment post on Post {
    title
    slug {
      current
    }
    password
    date
    categories
    contentRaw
  }
`;
export const postCollectionFragmentDoc = gql`
  fragment postCollection on PostCollection {
    title
    slug {
      current
    }
    contentRaw
    showPerPage
    posts {
      ...post
    }
  }
  ${postFragmentDoc}
`;
export const imageFragmentDoc = gql`
  fragment image on Image {
    asset {
      extension
      label
      size
      assetId
      path
      url
    }
    hotspot {
      x
      y
      height
      width
    }
    crop {
      top
      bottom
      left
      right
    }
  }
`;
export const menuItemFragmentDoc = gql`
  fragment menuItem on SiteHeaderInternalReference {
    ... on SiteHeaderInternalReference {
      title
      internal {
        ... on Page {
          slug {
            current
          }
        }
        ... on Post {
          slug {
            current
          }
        }
        ... on PostCollection {
          slug {
            current
          }
        }
      }
    }
  }
`;
export const siteSettingsFragmentDoc = gql`
  fragment siteSettings on SiteSettings {
    title
    subtitleRaw
    frontPage {
      ... on Page {
        ...page
      }
      ... on Post {
        ...post
      }
      ... on PostCollection {
        ...postCollection
      }
    }
    googleAnalyticsId
    siteHeader {
      headerImage {
        ...image
      }
      menuItems {
        ...menuItem
      }
    }
  }
  ${pageFragmentDoc}
  ${postFragmentDoc}
  ${postCollectionFragmentDoc}
  ${imageFragmentDoc}
  ${menuItemFragmentDoc}
`;
export const AllSlugsDocument = gql`
  query allSlugs {
    postSlugs: allPosts {
      id: _id
      slug {
        current
      }
    }
    pageSlugs: allPages {
      id: _id
      slug {
        current
      }
    }
    postCollectionSlugs: allPostCollections {
      id: _id
      slug {
        current
      }
    }
  }
`;
export type AllSlugsComponentProps = Omit<
  ReactApollo.QueryProps<AllSlugsQuery, AllSlugsQueryVariables>,
  "query"
>;

export const AllSlugsComponent = (props: AllSlugsComponentProps) => (
  <ReactApollo.Query<AllSlugsQuery, AllSlugsQueryVariables>
    query={AllSlugsDocument}
    {...props}
  />
);

export type AllSlugsProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<AllSlugsQuery, AllSlugsQueryVariables>
> &
  TChildProps;
export function withAllSlugs<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    AllSlugsQuery,
    AllSlugsQueryVariables,
    AllSlugsProps<TChildProps>
  >
) {
  return ReactApollo.withQuery<
    TProps,
    AllSlugsQuery,
    AllSlugsQueryVariables,
    AllSlugsProps<TChildProps>
  >(AllSlugsDocument, {
    alias: "withAllSlugs",
    ...operationOptions
  });
}
export const IndexPageDocument = gql`
  query indexPage {
    posts: allPosts {
      ...post
    }
    siteSettings: SiteSettings(id: "settings") {
      ...siteSettings
    }
  }
  ${postFragmentDoc}
  ${siteSettingsFragmentDoc}
`;
export type IndexPageComponentProps = Omit<
  ReactApollo.QueryProps<IndexPageQuery, IndexPageQueryVariables>,
  "query"
>;

export const IndexPageComponent = (props: IndexPageComponentProps) => (
  <ReactApollo.Query<IndexPageQuery, IndexPageQueryVariables>
    query={IndexPageDocument}
    {...props}
  />
);

export type IndexPageProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<IndexPageQuery, IndexPageQueryVariables>
> &
  TChildProps;
export function withIndexPage<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    IndexPageQuery,
    IndexPageQueryVariables,
    IndexPageProps<TChildProps>
  >
) {
  return ReactApollo.withQuery<
    TProps,
    IndexPageQuery,
    IndexPageQueryVariables,
    IndexPageProps<TChildProps>
  >(IndexPageDocument, {
    alias: "withIndexPage",
    ...operationOptions
  });
}
export const PostByIdDocument = gql`
  query postById($id: ID!) {
    Post(id: $id) {
      ...post
    }
  }
  ${postFragmentDoc}
`;
export type PostByIdComponentProps = Omit<
  ReactApollo.QueryProps<PostByIdQuery, PostByIdQueryVariables>,
  "query"
> &
  ({ variables: PostByIdQueryVariables; skip?: false } | { skip: true });

export const PostByIdComponent = (props: PostByIdComponentProps) => (
  <ReactApollo.Query<PostByIdQuery, PostByIdQueryVariables>
    query={PostByIdDocument}
    {...props}
  />
);

export type PostByIdProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<PostByIdQuery, PostByIdQueryVariables>
> &
  TChildProps;
export function withPostById<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    PostByIdQuery,
    PostByIdQueryVariables,
    PostByIdProps<TChildProps>
  >
) {
  return ReactApollo.withQuery<
    TProps,
    PostByIdQuery,
    PostByIdQueryVariables,
    PostByIdProps<TChildProps>
  >(PostByIdDocument, {
    alias: "withPostById",
    ...operationOptions
  });
}
export const PageByIdDocument = gql`
  query pageById($id: ID!) {
    Page(id: $id) {
      ...page
    }
  }
  ${pageFragmentDoc}
`;
export type PageByIdComponentProps = Omit<
  ReactApollo.QueryProps<PageByIdQuery, PageByIdQueryVariables>,
  "query"
> &
  ({ variables: PageByIdQueryVariables; skip?: false } | { skip: true });

export const PageByIdComponent = (props: PageByIdComponentProps) => (
  <ReactApollo.Query<PageByIdQuery, PageByIdQueryVariables>
    query={PageByIdDocument}
    {...props}
  />
);

export type PageByIdProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<PageByIdQuery, PageByIdQueryVariables>
> &
  TChildProps;
export function withPageById<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    PageByIdQuery,
    PageByIdQueryVariables,
    PageByIdProps<TChildProps>
  >
) {
  return ReactApollo.withQuery<
    TProps,
    PageByIdQuery,
    PageByIdQueryVariables,
    PageByIdProps<TChildProps>
  >(PageByIdDocument, {
    alias: "withPageById",
    ...operationOptions
  });
}
export const PostCollectionByIdDocument = gql`
  query postCollectionById($id: ID!) {
    PostCollection(id: $id) {
      ...postCollection
    }
  }
  ${postCollectionFragmentDoc}
`;
export type PostCollectionByIdComponentProps = Omit<
  ReactApollo.QueryProps<
    PostCollectionByIdQuery,
    PostCollectionByIdQueryVariables
  >,
  "query"
> &
  (
    | { variables: PostCollectionByIdQueryVariables; skip?: false }
    | { skip: true });

export const PostCollectionByIdComponent = (
  props: PostCollectionByIdComponentProps
) => (
  <ReactApollo.Query<PostCollectionByIdQuery, PostCollectionByIdQueryVariables>
    query={PostCollectionByIdDocument}
    {...props}
  />
);

export type PostCollectionByIdProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<
    PostCollectionByIdQuery,
    PostCollectionByIdQueryVariables
  >
> &
  TChildProps;
export function withPostCollectionById<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    PostCollectionByIdQuery,
    PostCollectionByIdQueryVariables,
    PostCollectionByIdProps<TChildProps>
  >
) {
  return ReactApollo.withQuery<
    TProps,
    PostCollectionByIdQuery,
    PostCollectionByIdQueryVariables,
    PostCollectionByIdProps<TChildProps>
  >(PostCollectionByIdDocument, {
    alias: "withPostCollectionById",
    ...operationOptions
  });
}
