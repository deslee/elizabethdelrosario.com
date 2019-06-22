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

declare module 'micro-cookie' {
    import http from 'http';
    type Handler = (req: http.IncomingMessage, res: http.ServerResponse) => void | Promise<void>
    const s: (handler: Handler) => Handler;
    export default s
}