import { verifyToken } from '../transform';
import { isEmpty } from 'lodash';


export const getRequestInfo = (req) => {
    const {
        params,
        query,
        body,
        path,
        method,
        originalUrl,
        headers: {
            chanel,
            token    
        } = {},
    } = req;

    return { params, query, body, chanel, token, path, originalUrl, method }
}

export const getLoggedInfo = async (req) => {
    const {
        headers: {
            token,
        } = {},
    } = req;
    if (isEmpty(token)) {
        return {};
    }
    const { message = {} } = await verifyToken(token);
    return message;
}

export const parseCredential = async (token, defaultValue = {}) => {
    if (isEmpty(token)) {
        return defaultValue;
    }
    const { message = {} } = await verifyToken(token);
    return message;
}