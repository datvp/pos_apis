import errors from './map';
export const getMessage = ( code ) => {
    if(code === 0) { return undefined }
    let message = errors[`${code}`];
    return message ? message : `Message for ${code} not defined`;
}