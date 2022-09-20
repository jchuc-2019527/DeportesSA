'use strict'

const express =  require('express');
const api = express.Router();
const saleController = require('../controllers/sale.controller');
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
 *      Sale:
 *          type: object
 *          properties:
 *              id:
 *                  type: string
 *                  description: the auto-generate id of products
 *              idProducts:
 *                  type: object
 *                  description: id de los productos a comprar
 *              quantity:
 *                  type: integer
 *                  description: cantidad de productos a comprar
 *              invoiceName:
 *                  type: string
 *                  description: a nombre de quien se genera la factura
 *          required:
 *              - idProducts
 *              - idUser
 *              - quantity
 *              - invoiceName
 *          example:
 *              idProducts: [
 *                              {
 *                                  "idP": "sIHKi2347ofsd9",
 *                                   "quantity":1
 *                              },
 *                              {
 *                                  "idP": "doayreb5689",
 *                                  "quantity":2
 *                              }
 *                          ]
 *              invoiceName: Juan 
 *              idUser: dpwon29387
 *  parameters:
 *      idUser:
 *          in: path
 *          name: idUser
 *          required: true
 *          schema:
 *              type: string
 *          description: id del usuario
 */

/**
 * @swagger
 * tags:
 *  name: Sale
 *  description: Sale endpoints
 */

api.get('/test', saleController.test);

/**
 * @swagger
 * /sale/sale:
 *  post:
 *      security:
 *          - bearerAuth: []
 *      summary: Comprar productos 
 *      tags: [Sale]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Sale'
 *      responses:
 *          200:
 *              description: Compra exitosa
 *              content:
 *                  application/json:
 *                      schemas:
 *                          $ref: '#/components/schemas/Sale'
 *          404:
 *              description: Productos no encontrados
 */

api.post('/sale', [mdAuth.ensureAuth], saleController.sale);

/**
 * @swagger
 * /sale/salesUser/{idUser}:
 *  get:
 *      security:
 *          - bearerAuth: []
 *      summary: Ver las compras de un usuario
 *      tags: [Sale]
 *      parameters:
 *          - $ref: '#/components/parameters/idUser'
 *      responses:
 *          200:
 *              description: Compras encontradas
 *              content:
 *                  application/json:
 *                      schema:
 *                      $ref: '#/components/schemas/Sale'
 *          404:
 *              description: 
 */

api.get('/salesUser/:idUser', [mdAuth.ensureAuth], saleController.salesUser);

module.exports = api;