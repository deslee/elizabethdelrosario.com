import authenticationMiddleware from "../services/authenticationMiddleware";
import http from 'http'
import compose from 'micro-compose'
import CustomHandler from "../types/CustomHandler";
import { CustomRequest } from "../types/CustomRequest";
import globalConfig from "../globalConfig";
import { binding } from "../schema";

export default compose(
    next => (req: http.IncomingMessage, res: http.ServerResponse) => {
        (req as CustomRequest).binding = binding;
        (req as CustomRequest).config = globalConfig;
        next(req, res);
    },
    ...authenticationMiddleware
) as (handler: CustomHandler) => (req: http.IncomingMessage, res: http.ServerResponse) => void | Promise<void>