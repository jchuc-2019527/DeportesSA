'use strict'

const express = require('express');
const api = express.Router();
const brandController = require('../controllers/brand.controller');
const mdAuth = require('../middlewares/authenticated.middlewares');

api.get('/test', brandController.test);
api.post('/createBrand/:idUser',[mdAuth.ensureAuth], brandController.createBrand);
api.get('/getBrand/:idBrand',[mdAuth.ensureAuth], brandController.getBrand);
api.get('/getBrands',[mdAuth.ensureAuth], brandController.getBrands);
api.delete('/deleteBrand/:idBrand',[mdAuth.ensureAuth], brandController.deleteBrand);
api.get('/getBrandsDeleted',[mdAuth.ensureAuth], brandController.getBrandsDeleted);
api.get('/getBrandsActives',[mdAuth.ensureAuth], brandController.getBrandsActives);
api.put('/updateBrand/:idBrand',[mdAuth.ensureAuth], brandController.updateBrand);

module.exports = api;   