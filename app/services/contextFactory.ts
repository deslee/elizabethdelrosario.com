import { validatorFactory } from './validation';
import { UserInputError } from 'apollo-server-core';
import { ValidationError } from 'yup';
import { CustomRequest } from '../types/CustomRequest';
import { CustomResponse } from '../types/CustomResponse';
import { CustomContext } from '../types/CustomContext';

export default (req: CustomRequest, res: CustomResponse): CustomContext => {
    const validators = validatorFactory(req.binding);
    const pgSettings: {'claims.userId'?: string, 'claims.sessionId'?: string} = {};
    if (req.user) {
        pgSettings['claims.userId'] = req.user.userId;
        pgSettings['claims.sessionId'] = req.user.sessionId;
    }
    return {
        req, res,
        pgSettings
    }
}