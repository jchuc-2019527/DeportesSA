'use strict'

const express =  require('express');
const api = express.Router();
const saleController = require('../controllers/sale.controller');
const mdAuth = require('../middlewares/authenticated.middlewares');

api.get('/test', [mdAuth.ensureAuth], saleController.test);
api.post('/sale', [mdAuth.ensureAuth], saleController.sale)

module.exports = api;