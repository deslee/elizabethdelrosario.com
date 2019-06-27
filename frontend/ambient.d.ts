declare module '@sanity/client';

declare module "*.graphql" {
    const content: string;
    export default content;
}

declare module 'next-apollo' {
    export const withData: any;
}