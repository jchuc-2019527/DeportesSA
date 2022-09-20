'use strict'

const express =  require('express');
const api = express.Router();
const saleController = require('../controllers/sale.controller');
const mdAuth = require('../middlewares/authenticated.middlewares');

/**
 * @swagger
 * tags:
 *  name: Sale
 *  description: Sale endpoints
 */

api.get('/test', saleController.test);

/**
 * @swagger
 * /sale:
 *  post:
 *      summary: Comprar productos 
 *      tags: [Sale]
 *      description: Sale endpoints
 */

api.post('/sale', [mdAuth.ensureAuth], saleController.sale);

/**
 * @swagger
 * /salesUser:
 *  get:
 *      summary: Ver las compras del usuario logueado
 *      tags: [Sale]
 *      description: Sale endpoints
 */

api.get('/salesUser', [mdAuth.ensureAuth], saleController.salesUser);

module.exports = api;