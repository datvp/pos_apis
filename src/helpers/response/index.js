import { STATUS_CODE } from '../../contants/http-code';
import * as Error from '../../errors';

export const send = ( res, result, status ) => {
    res.status(status || STATUS_CODE.BAD_REQUEST).json(result);
}

export const buildResponse = (code, data = null ) => {
    return {code,  message: code === 0 ? data : Error.getMessage(code)};
}