'use strict'

const express = require('express');
const api = express.Router();
const productsLineController = require('../controllers/productsLine.controller');
const mdAuth = require('../middlewares/authenticated.middlewares');

/**
 * @swagger
 * tags:
 *  name: Products Line
 *  description: Products Line endpoints
 */

api.get('/test', productsLineController.test);

/**
 * @swagger
 * /createProductLine:
 *  post:
 *      summary: Crear una nueva linea de productos
 *      tags: [Products Line]
 */

api.post('/createProductLine',[mdAuth.ensureAuth], productsLineController.createProductLine);

/**
 * @swagger
 * /productLine/:{idProductLine}:
 *  get:
 *      summary: Ver una linea de productos
 *      tags: [Products Line]
 */

api.get('/productLine/:idProductLine',[mdAuth.ensureAuth], productsLineController.productLine);

/**
 * @swagger
 * /productsLine:
 *  get:
 *      summary: Ver todas las lineas de productos
 *      tags: [Products Line]
 */

api.get('/productsLine',[mdAuth.ensureAuth], productsLineController.productsLine);

/**
 * @swagger
 * /productLineD/:{idProductLine}:
 *  delete:
 *      summary: Eliminar una linea de productos
 *      tags: [Products Line]
 */

api.delete('/productLineD/:idProductLine',[mdAuth.ensureAuth], productsLineController.productLineD);

/**
 * @swagger
 * /productsLineDeleted:
 *  get:
 *      summary: Ver las lineas de productos eliminadas
 *      tags: [Products Line]
 */

api.get('/productsLineDeleted',[mdAuth.ensureAuth], productsLineController.productsLineDeleted);

/**
 * @swagger
 * /productsLineActives:
 *  get:
 *      summary: Ver las lineas ade marcas activas
 *      tags: [Products Line]
 */

api.get('/productsLineActives',[mdAuth.ensureAuth], productsLineController.productsLineActives);

/**
 * @swagger
 * /productLineU:
 *  put:
 *      summary: Actualizar una linea de marca
 *      tags: [Products Line]
 */

api.put('/productLineU/:idProductLine',[mdAuth.ensureAuth], productsLineController.productLineU);

module.exports =api;