'use strict'

const express = require('express');
const api = express.Router();
const userController = require('../controllers/user.controller')


api.get('/test', userController.test);

/**
 * @swagger
 * components:
 *  schemas:
 *      User:
 *          type:object
 *           properties:
 *              name:
 *                 type: string
 *                  description: the name
 *              username:
 *                  type:string
 *                  description: the username
 *              email:
 *                  type: string
 *                  description: the email
 *              password:
 *                  type: string
 *                  description: the email
 *               required:
 *                  - name
 *                  - username
 *                  -email
 *                  -password
 *              
 */


api.post('/register', userController.register);

api.post('/login', userController.login);

module.exports = api;