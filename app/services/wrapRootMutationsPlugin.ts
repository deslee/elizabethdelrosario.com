import { makeWrapResolversPlugin } from "graphile-utils";
import globalConfig from "../globalConfig";
import { validateSession } from "./validateSession";
import { AuthenticationError } from "apollo-server-core";
import { CustomContext } from "../types/CustomContext";
import { validatorFactory } from "./validation";

const WHITELIST = ['login', 'logout', 'register']

export default makeWrapResolversPlugin(context => {
    if (context.scope.isRootMutation) {
        return { fieldName: context.scope.fieldName as string }
    }
    return null;
}, ({ fieldName }) => async (resolver, source, args, context: CustomContext, resolveInfo) => {
    // for mutations, we want to do XSRF validation on the header
    // TODO: find a better way to set a whitelist
    if (WHITELIST.indexOf(fieldName) === -1) {
        const header = context.req.header(globalConfig.sessionIdHeaderName);
        const session = await validateSession(header, context.req.user && context.req.user.userId)
        if (!session) {
            throw new AuthenticationError("XSRF check failed!");
        }
    }

    const validators = validatorFactory(context.req.binding);
    if (validators[fieldName]) {
        await validators[fieldName](args);
    }

    const result = await resolver(source, args, context, resolveInfo);
    return result;
})

