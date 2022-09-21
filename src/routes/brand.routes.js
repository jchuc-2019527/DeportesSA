'use strict'

const express = require('express');
const api = express.Router();
const brandController = require('../controllers/brand.controller');
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
 *      Brand:
 *          type: object
 *          properties: 
 *              id: 
 *                  type: string
 *                  description: the auto-generate id of brand
 *              nameMarca: 
 *                  type: string
 *                  description: nombre de la marca
 *              description:
 *                  type: string
 *                  description: descripcion adicional de la marca
 *          required: 
 *              - nameMarca
 *              - description
 *          example:
 *                  nameMarca: newBalance
 *                  description: regularmente es una marca de zapatos
 *      BrandNotFound:
 *          type: object
 *          properties:
 *              msg:
 *                  type: string
 *                  description: Mensaje de marca no encontrada
 *          example:
 *              msg: Brand not found
 *  parameters:
 *      idBrand:
 *          in: path
 *          name: idBrand
 *          required: true
 *          schema:
 *                  type: string
 *          description: id de la marca
 */


/**
 * @swagger
 * tags:
 *  name: Brand
 *  description: Brand endpoints
 */

api.get('/test', brandController.test);
/**
 * @swagger
 * /brand/createBrand:
 *  post:
 *      security: 
 *          - bearerAuth: []
 *      summary: agregar una marca
 *      tags: [Brand]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Brand'
 *      responses:
 *          201:
 *              description: marca creada
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Brand'
 *          500:
 *              description: error en el servidor
 */
api.post('/createBrand',[mdAuth.ensureAuth], brandController.createBrand);

/**
 * @swagger
 * /brand/getBrand/{idBrand}:
 *  get:
 *      security:
 *          - bearerAuth: []
 *      summary: Obetener una marca por el id
 *      tags: [Brand]
 *      parameters:
 *          - $ref: '#/components/parameters/idBrand'
 *      responses: 
 *          200:
 *              description: Marca encontrada
 *              content:
 *                  application/json:
 *                      schema:
 *                      $ref: '#/components/schemas/Brand'
 *          404:
 *              description: Marca no encontrada
 */

api.get('/getBrand/:idBrand',[mdAuth.ensureAuth], brandController.getBrand);

/**
 * @swagger
 * /brand/brands:
 *  get:
 *      security:
 *          - bearerAuth: []
 *      summary: Obtener todas las marcas
 *      tags: [Brand]
 *      responses: 
 *          200:
 *              description: Marcas encontradas
 *              content:
 *                  application/json:
 *                      schema:
 *                      $ref: '#/components/schemas/Brand'
 */

api.get('/brands',[mdAuth.ensureAuth], brandController.brands);

/**
 * @swagger
 * /brand/brandD/{idBrand}:
 *  delete:
 *      security: 
 *          - bearerAuth: []
 *      summary: Eliminar una marca
 *      tags: [Brand]
 *      parameters:
 *          - $ref: '#/components/parameters/idBrand'
 *      responses:
 *          200:
 *              description: Marca eliminada
 *              content:
 *                  application/json:
 *                      schema:
 *                      $ref: '#/components/schemas/Brand'
 *          404:
 *              description: Marca no encontrada
 */

api.delete('/brandD/:idBrand',[mdAuth.ensureAuth], brandController.brandD);

/**
 * @swagger
 * /brand/brandsDeleted:
 *  get:
 *      security: 
 *          - bearerAuth: []
 *      summary: Ver las marcas eliminadas
 *      tags: [Brand]
 *      responses:
 *          200:
 *              description: Marcas eliminadas o incativas
 *              content:
 *                  application/json:
 *                      schema:
 *                      $ref: '#/components/schemas/Brand'
 */

api.get('/brandsDeleted',[mdAuth.ensureAuth], brandController.brandsDeleted);

/**
 * @swagger
 * /brand/brandsActives:
 *  get:
 *      security:
 *          - bearerAuth: []
 *      summary: Ver las marcas activas
 *      tags: [Brand]
 *      responses:
 *          200:
 *              description: Marcas activas
 *              content: 
 *                  application/json:
 *                      schema:
 *                      $ref: '#/components/schemas/Brand'
 */

api.get('/brandsActives',[mdAuth.ensureAuth], brandController.brandsActives);

/**
 * @swagger
 * /brand/brandU/{idBrand}:
 *  put:
 *      security:
 *          - bearerAuth: []
 *      summary: Actulizar una marca
 *      tags: [Brand]
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema: 
 *                      $ref: '#/components/schemas/Brand'
 *      parameters:
 *          - $ref: '#/components/parameters/idBrand' 
 *      responses:
 *          200:
 *              description: Marca actualizada
 *              content:
 *                  application/json:
 *                      schema:
 *                      $ref: '#/components/schemas/Brand'
 *          404:
 *              description: Marca no encontrada
 */

api.put('/brandU/:idBrand',[mdAuth.ensureAuth], brandController.brandU);

module.exports = api;   