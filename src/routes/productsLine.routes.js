'use strict'

const express = require('express');
const api = express.Router();
const productsLineController = require('../controllers/productsLine.controller');
const mdAuth = require('../middlewares/authenticated.middlewares');

/**
 * @swagger
 * components:
 *  securitySchemes:
 *      bearerAuth:
 *          type: http
 *          scheme: bearer
 *          in: headers
 *          bearerFormat: JWT
 *  schemas:
 *      ProductLine:
 *          type: object
 *          properties:
 *              id:
 *                  type: string
 *                  description: the auto-generate id of productLine
 *              nameLine:
 *                  type: string
 *                  description: nombre de la line del producto
 *              description:
 *                  type: string
 *                  description: descripcion adicional de una linea de marca
 *          required:
 *              - nameLine
 *              - description
 *          example:
 *              nameLine: zapatos
 *              description: esto es una linea de productos
 *  parameters:
 *      idProductLine:
 *          in: path
 *          name: idProductLine
 *          required: true
 *          schema:
 *                  type: string
 *          description: id de la linea del producto
 */

/**
 * @swagger
 * tags:
 *  name: Products Line
 *  description: Products Line endpoints
 */

api.get('/test', productsLineController.test);

/**
 * @swagger
 * /productsLine/createProductLine:
 *  post:
 *      security:
 *          - bearerAuth: []
 *      summary: Crear una nueva linea de productos
 *      tags: [Products Line]
 *      requestBody: 
 *          required: true
 *          content:
 *              application/json:
 *                  schema: 
 *                      $ref: '#/components/schemas/ProductLine'
 *      responses:
 *          200:
 *              description: linea creada
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/ProductLine'
 *          500:
 *              description: error en el servidor
 *          
 */

api.post('/createProductLine',[mdAuth.ensureAuth], productsLineController.createProductLine);

/**
 * @swagger
 * /productsLine/productLine/{idProductLine}:
 *  get:
 *      security:
 *          - bearerAuth: []
 *      summary: Ver una linea de productos
 *      tags: [Products Line]
 *      parameters:
 *          - $ref: '#/components/parameters/idProductLine'
 *      responses:
 *          200:
 *              description: linea del producto encontrada
 *              content: 
 *                  application/json:
 *                      schema:
 *                      $ref: '#/components/schemas/ProductLine'
 *          404:
 *              description: Linea del producto no encontrada
 */

api.get('/productLine/:idProductLine',[mdAuth.ensureAuth], productsLineController.productLine);

/**
 * @swagger
 * /productsLine/productsLine:
 *  get:
 *      security: 
 *          - bearerAuth: []
 *      summary: Ver todas las lineas de productos
 *      tags: [Products Line]
 *      responses:
 *          200:
 *              description: Lineas de productos encontradas
 *              content:
 *                  application/json:
 *                      schema:
 *                      $ref: '#/components/schemas/ProductLine'
 *          500:
 *              description: Error en el servidor
 *          
 */

api.get('/productsLine',[mdAuth.ensureAuth], productsLineController.productsLine);

/**
 * @swagger
 * /productsLine/productLineD/{idProductLine}:
 *  delete:
 *      security:
 *          - bearerAuth: []
 *      summary: Eliminar una linea de productos
 *      tags: [Products Line]
 *      parameters:
 *          - $ref: '#/components/parameters/idProductLine'
 *      responses:
 *          200:
 *              description: Linea eliminada
 *              content:
 *                  application/json:
 *                      schemas:
 *                      $ref: '#/components/schemas/ProductLine'
 *          404:
 *              description: Marca no encontrada
 */

api.delete('/productLineD/:idProductLine',[mdAuth.ensureAuth], productsLineController.productLineD);

/**
 * @swagger
 * /productsLine/productsLineDeleted:
 *  get:
 *      security:
 *          - bearerAuth: []
 *      summary: Ver las lineas de productos eliminadas
 *      tags: [Products Line]
 *      responses:
 *          200:
 *              description: Lineas de productos eliminadas o inactivas
 *              content: 
 *                  application/json:
 *                      schema:
 *                      $ref: '#/components/schemas/ProductLine'
 *          500: 
 *              description: Error en el servidor
 */

api.get('/productsLineDeleted',[mdAuth.ensureAuth], productsLineController.productsLineDeleted);

/**
 * @swagger
 * /productsLine/productsLineActives:
 *  get:
 *      security:
 *          - bearerAuth: []
 *      summary: Ver las lineas ade marcas activas
 *      tags: [Products Line]
 *      responses:
 *          200:
 *              description: Lineas de productos activas
 *              content:
 *                  application/json:
 *                      schema:
 *                      $ref: '#/components/schemas/ProductLine' 
 */

api.get('/productsLineActives',[mdAuth.ensureAuth], productsLineController.productsLineActives);

/**
 * @swagger
 * /productsLine/productLineU/{idProductLine}:
 *  put:
 *      security:
 *          - bearerAuth: []
 *      summary: Actualizar una linea de marca
 *      tags: [Products Line]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/ProductLine'
 *      parameters:
 *          - $ref: '#/components/parameters/idProductLine'
 *      responses:
 *          200:
 *              description: Linea de producto actualizada
 *              content:
 *                  application/json:
 *                      schema:
 *                      $ref: '#/components/schemas/ProductLine'
 *          404:
 *              description: Linea no encontrada
 */

api.put('/productLineU/:idProductLine',[mdAuth.ensureAuth], productsLineController.productLineU);

module.exports =api;