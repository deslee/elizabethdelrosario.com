import authenticationMiddleware from "../services/authenticationMiddleware";
import { CustomRequest } from "../types/CustomRequest";
import compression from 'compression';
import globalConfig from "../globalConfig";
import { binding } from "../schema";

export default [
    (req, res, next) => {
        (req as CustomRequest).binding = binding;
        (req as CustomRequest).config = globalConfig;
        next();
    },
    compression(),
    ...authenticationMiddleware
]