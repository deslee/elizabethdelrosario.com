import { CustomRequest } from "./CustomRequest";
import { CustomResponse } from "./CustomResponse";

export interface CustomContext {
    req: CustomRequest,
    res: CustomResponse,
    pgSettings?: {
        [key: string]: {} | string | number | boolean | undefined | null;
    }
}
