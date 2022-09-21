'use strict'

const express = require('express');
const api = express.Router();
const productsController = require('../controllers/products.controler');
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
 *      Products:
 *          type: object
 *          properties:
 *              id:
 *                  type: string
 *                  description: the auto-generate id of productLine
 *              nameProduct:
 *                  type: string
 *                  description: nombre del producto
 *              precio:
 *                  type: integer
 *                  description: precio de cada articulo
 *              stock:
 *                  type: integer
 *                  description: numero de productos existentes
 *              description:
 *                  type: string
 *                  description: descripcion del producto ha agregar
 *              idMarca:
 *                  type: string
 *                  description: id de la marca a la que pertenece
 *              idProductLine:
 *                  type: string
 *                  description: id de la linea a la que pertenece
 *          required:
 *              - nameProduct
 *              - precio
 *              - stock
 *              - description
 *              - idMarca
 *              - idProductLine
 *          example:
 *              nameProduct: Calcetines de dinosaurio
 *              precio: 100
 *              stock: 12
 *              description: calcetines de algodon
 *              idMarca: asdasdjkas1adsa
 *              idProductLine: asdkio2347ml
 *      Stock:
 *          type: object
 *          properties:
 *              stock:
 *                  type: integer
 *                  description: stock
 *  parameters: 
 *      idProduct:
 *          in: path
 *          name: idProduct
 *          required: true
 *          schema:
 *              type: string
 *          description: id del producto
 */

/**
 * @swagger
 * tags:
 *  name: Products
 *  description: Products endpoints
 */

api.get('/test', productsController.test);

/**
 * @swagger
 * /products/createProduct:
 *  post:
 *      security:
 *          - bearerAuth: []
 *      summary: Crear un producto
 *      tags: [Products]
 *      description: Products
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Products'
 *      responses: 
 *          201:
 *              description: producto agregado
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Products'
 *          500:
 *              description: error en el servidor
 */

api.post('/createProduct', [mdAuth.ensureAuth], productsController.createProduct);

/**
 * @swagger
 * /products/addedStock/{idProduct}:
 *  post:
 *      security:
 *          - bearerAuth: []
 *      summary: Agregar productos al stock
 *      tags: [Products]
 *      parameters:
 *          - $ref: '#/components/parameters/idProduct'
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Stock'
 *      responses:
 *          200:
 *              description: stock actualizado
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Stock'
 *          500:
 *              description: error en el servidor
 */

api.post('/addedStock/:idProduct', [mdAuth.ensureAuth], productsController.addedStock);

/**
 * @swagger
 * /products/product/{idProduct}:
 *  get:
 *      security:
 *          - bearerAuth: []
 *      summary: Obtener un producto dado un id
 *      tags: [Products]
 *      parameters: 
 *          - $ref: '#/components/parameters/idProduct'
 *      responses:
 *          200:
 *              description: Producto encontrado
 *              content:
 *                  application/json:
 *                      schema:
 *                      $ref: '#/components/schemas/Products'
 *          404:
 *              description: Producto no encontrado
 */

api.get('/product/:idProduct', [mdAuth.ensureAuth], productsController.product);

/**
 * @swagger
 * /products/products:
 *  get:
 *      security:
 *          - bearerAuth: []
 *      summary: Ver todos los productos
 *      tags: [Products]
 *      responses:
 *          200:
 *              description: Productos encontrados
 *              content:
 *                  application/json:
 *                      schema:
 *                      $ref: '#/components/schemas/Products'
 */

api.get('/products', [mdAuth.ensureAuth], productsController.products);

/**
 * @swagger
 * /products/productD/{idProduct}:
 *  delete:
 *      security:
 *          - bearerAuth: []
 *      summary: Eliminar un producto
 *      tags: [Products]
 *      parameters:
 *          - $ref: '#/components/parameters/idProduct'
 *      responses:
 *          200:
 *              description: Producto eliminado
 *              content:
 *                  application/json:
 *                      schemas:
 *                      $ref: '#/components/schemas/Products'
 *          404:
 *              description: Producto no encontrado
 */

api.delete('/productD/:idProduct', [mdAuth.ensureAuth], productsController.productD);

/**
 * @swagger
 * /products/productsDeleted:
 *  get:
 *      security:
 *          - bearerAuth: []
 *      summary: Ver los productos eliminados
 *      tags: [Products]
 *      responses:
 *          200:
 *              description: Productos eliminados o inactivos
 *              content:
 *                  application/json:
 *                      schema:
 *                      $ref: '#/components/schemas/Products'
 */

api.get('/productsDeleted', [mdAuth.ensureAuth], productsController.productsDeleted);

/**
 * @swagger
 * /products/productsActives:
 *  get:
 *      security: 
 *          - bearerAuth: []
 *      summary: Ver todos los productos activos
 *      tags: [Products]
 *      responses:
 *          200:
 *              description: Productos activos
 *              content:
 *                  application/json:
 *                      schema:
 *                      $ref: '#/components/schemas/Products'
 *          500:
 *              description: Error en el servidor
 */

api.get('/productsActives', [mdAuth.ensureAuth], productsController.productsActives);

/**
 * @swagger
 * /products/productU/{idProduct}:
 *  put:
 *      security:
 *          - bearerAuth: []
 *      summary: Actualizar un producto
 *      tags: [Products]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Products'
 *      parameters:
 *          - $ref: '#/components/parameters/idProduct'
 *      responses:
 *          200:
 *              description: Producto actualizado
 *              content:
 *                  application/json:
 *                      schema:
 *                      $ref: '#/components/schemas/Products'
 *          404:
 *              description: Producto no encontrado
 */

api.put('/productU/:idProduct', [mdAuth.ensureAuth], productsController.productU);

module.exports = api;