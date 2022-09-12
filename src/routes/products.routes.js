'use strict'

const express = require('express');
const api = express.Router();
const productsController = require('../controllers/products.controler');
const mdAuth = require('../middlewares/authenticated.middlewares');

api.get('/test', productsController.test);
api.post('/createProduct/:idMarca/:idProductLine', [mdAuth.ensureAuth], productsController.createProduct);
api.post('/addedStock/:idProduct', [mdAuth.ensureAuth], productsController.addedStock);
api.get('/getProduct/:idProduct', [mdAuth.ensureAuth], productsController.getProduct);
api.get('/getProducts', [mdAuth.ensureAuth], productsController.getProducts);
api.delete('/deleteProduct/:idProduct', [mdAuth.ensureAuth], productsController.deleteProduct);
api.get('/getProductsDeleted', [mdAuth.ensureAuth], productsController.getProductsDeleted);
api.get('/getProductsActives', [mdAuth.ensureAuth], productsController.getProductsActives);
api.put('/updateProduct/:idProduct', [mdAuth.ensureAuth], productsController.updateProduct);

module.exports = api;