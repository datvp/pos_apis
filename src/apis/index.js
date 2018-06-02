import express from 'express';
import {
  login,
  logout,
  getListInstock,
  getCustomerDetailById,
  getData
} from './dal';

const router = express.Router();
router.post('/login', login);
router.post('/logout', logout);
router.get('/getData', getData);
router.get('/getListInstock', getListInstock);
router.get('/getCustomerDetailById/:artistId', getCustomerDetailById);

module.exports = router;