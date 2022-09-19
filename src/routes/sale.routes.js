'use strict'

const express =  require('express');
const api = express.Router();
const saleController = require('../controllers/sale.controller');
const mdAuth = require('../middlewares/authenticated.middlewares');

api.get('/test', saleController.test);
api.post('/sale', [mdAuth.ensureAuth], saleController.sale);
api.get('/getSalesUser', [mdAuth.ensureAuth], saleController.getSalesUser);

module.exports = api;