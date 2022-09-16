'use strict'

const express = require('express');
const res = require('express/lib/response');
const api = express.Router();
const userController = require('../controllers/user.controller')


api.get('/test', userController.test);
/**
 * @swagger
 * /api/test:
 *  get:
 *   description: Use to request all users
 */

api.post("/register", userController.register);

api.post('/login', userController.login);
api.get('/**', (req, res) => {
    return res.send('ENPOINT NOT FOUND :(')
})

module.exports = api;