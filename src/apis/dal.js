import { isEmpty } from 'lodash/fp';

import { connect, Int, close, NVarChar } from 'mssql';
import { connectString } from '../config';
import { getRequestInfo } from '../helpers/request-info';
import { send, buildResponse } from '../helpers/response';
import { encrypt, decrypt, signToken } from '../helpers/transform';
import { STATUS_CODE } from '../contants/http-code';

export const fetchLaunchData = async (req, res) => {
  const { token } = getRequestInfo(req);
  const params = { token };
  const result = await Launch.fetchData(params);
  send(res, result, STATUS_CODE.SUCCESS);
}

export const getData = async (req, res) => {
  try {
      const pool = await connect(connectString);
      const strQuery = 'select ob.ObjectName,o.OrderId from orders o inner join Objects ob on o.ObjectId=ob.ObjectId where datepart(year,dtCreate)=@YearInput';
      const result = await pool.request()
      .input('YearInput', Int, 2015)
      .query(strQuery);
      await close();
      res.send(result);
  } catch (err) {
      await close();
      console.log('err', err);
      send(res, buildResponse(403), STATUS_CODE.BAD_REQUEST);
  }
};

export const login = async (req, res) => {
  try {
      const reqInfo = getRequestInfo(req);
      const {
          body: {
              userName = '',
              passWord = '',
          } = {},
      } = reqInfo;

      // console.log('userName', userName);

      const pool = await connect(connectString);

      // console.log('connectString', connectString);

      const strQuery = `select u.s_UID, u.s_PWD,e.s_Employee_ID,e.s_Name,e.s_Email,e.s_Phone1
            from LS_USER u left join LS_Employees e on u.s_Employee_ID=e.s_ID where u.s_UID=@EmpAccount`;
      const result = await pool.request()
      .input('EmpAccount', NVarChar, userName)
      .query(strQuery);

      // console.log('pool.request');

      await close();

      // console.log('close connection');

      const { recordset: [{
        s_UID: accountName = '',
        s_PWD: pwd = '',
        s_Employee_ID: empId = '',
        s_Name: empName = '',
        s_Phone1: phone = '',
        s_Email: email = '',
        avatar = '',
        birthday = '',
      }] = []} = result;

      // console.log('result', result);

      // account is not exist in our system
      if (isEmpty(accountName)) {
        send(res, buildResponse(141), STATUS_CODE.SUCCESS);
        return;
      }

      // generate token
      const objParam = {
        accountName,
        pwd,
        avatar,
        empId,
        empName,
        phone,
        email,
        birthday,
      };

      const { code, message: token = '' } = await signToken(objParam);

      send(res, buildResponse(0, { ...objParam, token }), STATUS_CODE.SUCCESS);

      // store in Token table : implement later
      if (code === 0) {
        // dal.post({ className: 'Tokens', data: { _id: token.message } }, SHENNA_DB_CFG );
      }
  } catch (err) {
      await close();
      console.log('err of login', STATUS_CODE.BAD_REQUEST);
      send(res, buildResponse(403), STATUS_CODE.BAD_REQUEST);
  }
};

export const logout = async (req, res) => {
  try {
    const reqInfo = getRequestInfo(req);
    const {
      body: {
        userName = '',
        passWord = '',
      } = {},
    } = reqInfo;
    const pool = await connect(config);
    const strQuery = 'select EmpId, EmpName, EmpAccount, EmpPassword from Employees where EmpAccount=@EmpAccount';
    const result = await pool.request()
      .input('EmpAccount', NVarChar, userName)
      .query(strQuery);
    await close();
    send(res, buildResponse(0, result), 200);
  } catch (error) {
    await close();
    console.log('error of logout', error);
    send(res, buildResponse(403), STATUS_CODE.BAD_REQUEST);
  }
};

export const getListInstock = async (req, res) => {
  try {
    
  } catch (error) {
    console.log('error of getListInstock', error);
    send(res, buildResponse(403), STATUS_CODE.BAD_REQUEST);
  }
};
  
export const getCustomerDetailById = async (req, res) => {
  try {
    
  } catch (error) {
    console.log('error of getListInstock', error);
    send(res, buildResponse(403), STATUS_CODE.BAD_REQUEST);
  }
};