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
 *  parameters:
 *      createBrand:
 *          in: headers
 *          name: token
 *          required: true
 *          schema:
 *                  typer: string
 *          description: the token jwt
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
 *          200:
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
 * /brand/:{idBrand}:
 *  get:
 *      summary: Obetener una marca 
 *      tags: [Brand]
 */

api.get('/brand/:idBrand',[mdAuth.ensureAuth], brandController.brand);

/**
 * @swagger
 * /brands:
 *  get:
 *      summary: Obtener todas las marcas
 *      tags: [Brand]
 */

api.get('/brands',[mdAuth.ensureAuth], brandController.brands);

/**
 * @swagger
 * /brandD/:{idBrand}:
 *  delete:
 *      summary: Eliminar una marca
 *      tags: [Brand]
 */

api.delete('/brandD/:idBrand',[mdAuth.ensureAuth], brandController.brandD);

/**
 * @swagger
 * /brandsDeleted:
 *  get:
 *      summary: Ver las marcas eliminadas
 *      tags: [Brand]
 */

api.get('/brandsDeleted',[mdAuth.ensureAuth], brandController.brandsDeleted);

/**
 * @swagger
 * /brandsActives:
 *  get:
 *      summary: Ver las marcas activas
 *      tags: [Brand]
 * 
 */

api.get('/brandsActives',[mdAuth.ensureAuth], brandController.brandsActives);

/**
 * @swagger
 * /brandU/:{idBrand}:
 *  put:
 *      summary: Actulizar una marca
 *      tags: [Brand]
 */

api.put('/brandU/:idBrand',[mdAuth.ensureAuth], brandController.brandU);

module.exports = api;   