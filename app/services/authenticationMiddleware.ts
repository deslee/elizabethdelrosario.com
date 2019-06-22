import http from 'http';
import jsonwebtoken from 'jsonwebtoken'
import { parse } from 'cookie'
import globalConfig from '../globalConfig';
import { validateSession } from './validateSession';
import passport from 'passport';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { CustomRequest } from '../types/CustomRequest';

export interface AuthenticatedSession {
    userId: string;
    sessionId: string;
}

type RequestHandler = (req: http.IncomingMessage, res: http.ServerResponse) => void | Promise<void>

const validateAgainstToken = async (token?: string): Promise<AuthenticatedSession | undefined> => {
    if (token && token.length) {
        try {
            const claim = jsonwebtoken.verify(token, globalConfig.jwtSecret) as Partial<AuthenticatedSession>;
            if (claim && claim.userId && claim.sessionId) {
                const session = await validateSession(claim.sessionId, claim.userId);
                if (session) {
                    return claim as AuthenticatedSession;
                    // return req.login(claim, { session: false }, err => {
                    //     if (err) {
                    //         return res.status(500).json({ err: err.message })
                    //     }
                    //     return next();
                    // })
                }
            }
        } catch (e) {
            console.error(e);
        }
    }
}

export const cookie: (next: RequestHandler) => RequestHandler = next => async (req, res) => {
    const cookies = parse((req.headers && req.headers.cookie) || "");
    const token = cookies && cookies.token;
    const session = await validateAgainstToken(token);
    if (session && session.sessionId) {
        (req as CustomRequest).user = session;
    }
    return next(req, res);
}

const getTokenFromReqAsBearerToken: (req: http.IncomingMessage) => string | undefined = (req) => {
    const authorizationHeadervalue = req.headers["authorization"];
    const re = /(\S+)\s+(\S+)/;
    if (authorizationHeadervalue && typeof authorizationHeadervalue === 'string' && authorizationHeadervalue.match(re)) {
        const matches = authorizationHeadervalue.match(re);
        const scheme = matches[1];
        if (scheme.toLowerCase() === 'bearer') {
            const token = matches[2];
            return token
        }
    }
    return undefined;
}

export const jwt: (next: RequestHandler) => RequestHandler = next => async (req, res) => {
    const token = getTokenFromReqAsBearerToken(req);
    const session = await validateAgainstToken(token);
    if (session && session.sessionId) {
        (req as CustomRequest).user = session;
    }
    return next(req, res);
}

// middleware required for authentication
export default [
    cookie,
    jwt
]