import { connectString } from '../config';
import { getRequestInfo } from '../helpers/request-info';
import { send, buildResponse } from '../helpers/response';

const sql = require('mssql');

export const getData = async (req, res) => {
  try {
      const pool = await sql.connect(connectString);
      const strQuery = 'select ob.ObjectName,o.OrderId from orders o inner join Objects ob on o.ObjectId=ob.ObjectId where datepart(year,dtCreate)=@YearInput';
      const result = await pool.request()
      .input('YearInput', sql.Int, 2015)
      .query(strQuery);
      await sql.close();
      res.send(result);
  } catch (err) {
      await sql.close();
      console.log('err', err);
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
      const pool = await sql.connect(connectString);
      const strQuery = 'select EmpId, EmpName, EmpAccount, EmpPassword from Employees where EmpAccount=@EmpAccount';
      const result = await pool.request()
      .input('EmpAccount', sql.NVarChar, userName)
      .query(strQuery);
      await sql.close();
      // res.send(result);
      send(res, buildResponse(0, result), 200);
  } catch (err) {
      await sql.close();
      console.log('err of login', err);
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
    const pool = await sql.connect(config);
    const strQuery = 'select EmpId, EmpName, EmpAccount, EmpPassword from Employees where EmpAccount=@EmpAccount';
    const result = await pool.request()
      .input('EmpAccount', sql.NVarChar, userName)
      .query(strQuery);
    await sql.close();
    send(res, buildResponse(0, result), 200);
  } catch (error) {
    await sql.close();
    console.log('error of logout', error);
  }
};

export const getListInstock = async (req, res) => {
  try {
    
  } catch (error) {
    console.log('error of getListInstock', error);
  }
};
  
export const getCustomerDetailById = async (req, res) => {
  try {
    
  } catch (error) {
    console.log('error of getListInstock', error);
  }
};