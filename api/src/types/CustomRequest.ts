import http from 'http';
import AuthenticatedSession from './AuthenticatedSession';
import { Binding } from '../schema';
import globalConfig from '../globalConfig';

export interface CustomRequest extends http.IncomingMessage {
    user?: AuthenticatedSession
    binding: Binding,
    config: typeof globalConfig
}