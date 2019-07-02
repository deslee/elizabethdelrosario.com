declare module '@sanity/client';

declare module "*.graphql" {
    const content: string;
    export default content;
}

declare module 'next-apollo' {
    import { LinkProps } from "next/link";
    export const withData: any;
    export const Link: React.ComponentType<LinkProps & {withData?: any}>;
}

declare module '@sanity/block-content-to-react';

declare module '@sanity/image-url'
