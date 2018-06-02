import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import Promise from 'bluebird';
import moment from 'moment';
import { cloneDeep, isEmpty, find } from 'lodash';

import * as CFG from '../../config';
import { buildResponse } from '../response';

const CIPHER_ALGORITHM = CFG['cipher']['algorithm'] || '';
const KEY = Buffer((CFG['cipher']['key'] || ''), 'hex');
const IV = Buffer((CFG['cipher']['iv'] || ''), 'hex');

const JWT_PUBLIC_KEY = CFG['jwt']['publicKey'];
const JWT_PRIVATE_KEY = CFG['jwt']['privateKey'];
const JWT_EXPIRED_TIME = CFG['jwt']['expiredTime']* 1000;
const JWT_ALGORITHM = CFG['jwt']['algorithm'];

export const decrypt = (text) => {
    const decipher = crypto.createDecipheriv(CIPHER_ALGORITHM, KEY, IV);
    if (isEmpty(text)) return '';
    let dec = '';
    try {
        dec = decipher.update(text, 'hex', 'utf8');
        dec += decipher.final();
    } catch (e) {
        console.log(e);
    }
    return dec;
}

export const encrypt = (text = '') => {
    let crypted = '';
    const cipher = crypto.createCipheriv(CIPHER_ALGORITHM, KEY, IV);
    try {
        crypted = cipher.update(text, 'utf8', 'hex');
        crypted += cipher.final('hex');
    } catch (e) {
        console.log(e);
    }
    return crypted;
}

export const signToken = token => {
    return  new Promise(resolve => {
        jwt.sign(token, JWT_PRIVATE_KEY, { algorithm: JWT_ALGORITHM, expiresIn: JWT_EXPIRED_TIME }, (error, token) => {
            const code = error ? 118 : 0;
            resolve(buildResponse(code, token))
        });
    });
}

export const formatDate = ( input, pattern = 'MM/DD/YYYY') => {
    return moment(input).format(pattern);
}

export const dateTimeToSecond = ({ date, time }) => {
    return moment(`${date} ${time}:00:00`, 'MM/DD/YYYY hh:mm:ss').format('X');
}

export const verifyToken = token => {
    return new Promise(resolve => {
        jwt.verify(token, JWT_PUBLIC_KEY, (error, decoded) => {
            let code = 0
            const { name } = error || {}
                
            if (name === 'TokenExpiredError') {
                code = 115
            } else if (name === 'JsonWebTokenError') {
                code = 116
            }

            // default system error
            code = (code === 0 && error) ? 117 : code
            resolve(buildResponse(code, decoded))
        });    
    })
}

export const callPromiseEmpty = async ( data ) => {
    return data;
}

export const convertFloatWithPrecision = (floatValue, precision = 3) => {
    try {
        const newVal = floatValue.toPrecision(precision);
        return parseFloat(newVal);
    } catch (e) {
        console.log(e);
    }
    return 0;
}

const BELL_CHAR = String.fromCharCode(0x07);
export const encryptUrlParams = ({ appointmentId, customerId, paymentId }) => {
    const array = [appointmentId, customerId, paymentId];
    const strData = array.join(BELL_CHAR);
    const encryptData = encrypt(strData);
    return encryptData;
}

export const decryptUrlParams = (encryptText) => {
    const strData = decrypt(encryptText);
    const array = strData.split(BELL_CHAR);
    const [appointmentId, customerId, paymentId] = array;
    return { appointmentId, customerId, paymentId };
}

export const parseDatefromMMDDYYYY = (inputStr = '') => {
    let result = new Date(1990, 1, 1);
    // console.log('inputStr', inputStr);
    try {
        const parts = inputStr.split('/');
        const year = parseInt(parts[2]);
        const month = parseInt(parts[0]);
        const day = parseInt(parts[1]);
        // console.log(year, month, day);
        result = new Date(year, month - 1, day, 0, 0, 0, 0); 
        } catch(e) {
        console.log(e);
        }
        return result;
}

export const parseDateFromISODate = (input) => {
    let result = new Date(1990, 1, 1);
    try {
        result = new Date(input);
    } catch(e) {
        console.log(e);
    }
    return result;
}

export const parseStr2JSON = (jsonStr, defaultValue) => {
    let result = defaultValue;
    try {
        result = JSON.parse(jsonStr);
    } catch (e) {}
    return result;
}

export const replace = (strInput, oldChar, newChar) => {
    strInput = isEmpty(strInput) ? '' : strInput;
    const arr = strInput.split(oldChar);
    return arr.join(newChar);
}

export const gmtOffsetInSecsToUTC = (gmtOffset) => {
    const gmtOffsetInMins = gmtOffset / 60; // in minutes
    let minutes = gmtOffsetInMins % 60; // remainder of minutes
    const hours = gmtOffsetInMins / 60; // hours
    minutes = (minutes + '').length === 2 ? (minutes + '') : ('0' + minutes);
    return `${hours}:${minutes}`;
}