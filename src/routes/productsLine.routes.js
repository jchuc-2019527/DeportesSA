'use strict'

const express = require('express');
const api = express.Router();
const productsLineController = require('../controllers/productsLine.controller');
const mdAuth = require('../middlewares/authenticated.middlewares');

api.get('/test', productsLineController.test);
api.post('/createProductLine',[mdAuth.ensureAuth], productsLineController.createProductLine);
api.get('/getProductLine/:idProductLine',[mdAuth.ensureAuth], productsLineController.getProductLine);
api.get('/getProductsLine',[mdAuth.ensureAuth], productsLineController.getProductsLine);
api.delete('/deleteProductLine/:idProductLine',[mdAuth.ensureAuth], productsLineController.deleteProductLine);
api.get('/getProductsLineDeleted',[mdAuth.ensureAuth], productsLineController.getProductsLineDeleted);
api.get('/getProductsLineActives',[mdAuth.ensureAuth], productsLineController.getProductsLineActives);
api.put('/updateProductLine/:idProductLine',[mdAuth.ensureAuth], productsLineController.updateProductLine);

module.exports =api;