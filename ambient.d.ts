declare namespace NodeJS {
    interface Process {
        browser: boolean;
    }
}

declare module "*.graphql" {
    const content: string;
    export default content;
}

declare module "*.json" {
    const content: any;
    export default content;
}