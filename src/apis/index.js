import express from 'express';
import {
  login,
  logout,
  getListInstock,
  getCustomerDetailById,
  getData,
  getCustomerByLastItemIndex
} from './dal';

const router = express.Router();
router.post('/login', login);
router.post('/logout', logout);
router.get('/fetch/launch', getData);
router.get('/getData', getData);
router.get('/getListInstock', getListInstock);
router.get('/getCustomerDetailById/:artistId', getCustomerDetailById);
router.get('/customers/fetch/:LastItemIndex', getCustomerByLastItemIndex);

export default router;