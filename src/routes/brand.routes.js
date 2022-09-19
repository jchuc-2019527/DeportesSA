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
api.get('/getBrand/:idBrand',[mdAuth.ensureAuth], brandController.getBrand);
api.get('/getBrands',[mdAuth.ensureAuth], brandController.getBrands);
api.delete('/deleteBrand/:idBrand',[mdAuth.ensureAuth], brandController.deleteBrand);
api.get('/getBrandsDeleted',[mdAuth.ensureAuth], brandController.getBrandsDeleted);
api.get('/getBrandsActives',[mdAuth.ensureAuth], brandController.getBrandsActives);
api.put('/updateBrand/:idBrand',[mdAuth.ensureAuth], brandController.updateBrand);

module.exports = api;   