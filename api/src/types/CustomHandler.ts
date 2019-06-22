import { CustomRequest } from "./CustomRequest";
import { CustomResponse } from "./CustomResponse";

type CustomHandler = (req: CustomRequest, res: CustomResponse) => void | Promise<void>
export default CustomHandler;