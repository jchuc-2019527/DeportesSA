'use strict'

const express =  require('express');
const api = express.Router();
const saleController = require('../controllers/sale.controller');
const mdAuth = require('../middlewares/authenticated.middlewares');

/**
 * @swagger
 * /sale/test:
 *  get:
 *   description: Use to request all users
 */
api.get('/test', saleController.test);
api.post('/sale', [mdAuth.ensureAuth], saleController.sale)

module.exports = api;