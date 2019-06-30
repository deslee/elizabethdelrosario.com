declare module '@sanity/client';

declare module "*.graphql" {
    const content: string;
    export default content;
}

declare module 'next-apollo' {
    export const withData: any;
}

declare module '@sanity/block-content-to-react';
declare module '@sanity/image-url'