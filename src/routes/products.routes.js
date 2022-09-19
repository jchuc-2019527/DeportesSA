'use strict'

const express = require('express');
const api = express.Router();
const productsController = require('../controllers/products.controler');
const mdAuth = require('../middlewares/authenticated.middlewares');

/**
 * @swagger
 * tags:
 *  name: Products
 *  description: Products endpoints
 */

api.get('/test', productsController.test);

/**
 * @swagger
 * /createProduct:
 *  post:
 *      summary: Crear un producto
 *      tags: [Products]
 *      description: Products
 */

api.post('/createProduct', [mdAuth.ensureAuth], productsController.createProduct);

/**
 * @swagger
 * /addedStock/:{idProduct}:
 *  post:
 *      summary: Agregar productos al stock
 *      tags: [Products]
 */

api.post('/addedStock/:idProduct', [mdAuth.ensureAuth], productsController.addedStock);

/**
 * @swagger
 * /product/:{idProduct}:
 *  get:
 *      summary: Obtener un producto dado un id
 *      tags: [Products]
 */

api.get('/product/:idProduct', [mdAuth.ensureAuth], productsController.product);

/**
 * @swagger
 * /products:
 *  get:
 *      summary: Ver todos los productos
 *      tags: [Products]
 */

api.get('/products', [mdAuth.ensureAuth], productsController.products);

/**
 * @swagger
 * /productD/:{idProduct}:
 *  delete:
 *      summary: Eliminar un producto
 *      tags: [Products]
 */

api.delete('/productD/:idProduct', [mdAuth.ensureAuth], productsController.productD);

/**
 * @swagger
 * /producsDeleted:
 *  get:
 *      summary: Ver los productos eliminados
 *      tags: [Products]
 */

api.get('/productsDeleted', [mdAuth.ensureAuth], productsController.productsDeleted);

/**
 * @swagger
 * /productsActives:
 *  get:
 *      summary: Ver todos los productos activos
 *      tags: [Products]
 */

api.get('/productsActives', [mdAuth.ensureAuth], productsController.productsActives);

/**
 * @swagger
 * /productU/:{idProduct}:
 *  put:
 *      summary: Actualizar un producto
 *      tags: [Products]
 */

api.put('/productU/:idProduct', [mdAuth.ensureAuth], productsController.productU);

module.exports = api;