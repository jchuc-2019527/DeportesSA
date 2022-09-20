'use strict'

const express = require('express');
const res = require('express/lib/response');
const api = express.Router();
const userController = require('../controllers/user.controller')
/**
 * @swagger
 * components:
 *  schemas:
 *      User:
 *          type: object
 *          properties:
 *              id:
 *                  type: string
 *                  description: the auto-generated id of user
 *              name:
 *                  type: string
 *                  description: the name 
 *              username:
 *                  type: string
 *                  description: the username
 *              email:
 *                  type: string
 *                  description: the email
 *              password:
 *                  type: string
 *                  description: 
 *          required:
 *              - name
 *              - username
 *              - email
 *              - password
 *          example:
 *              id: 6885e267-0dc6-444c-9972-6147fdf50ec0
 *              name: juan
 *              username: juan123
 *              email: juan123@gmail.com
 *              password: dasa13421sada
 *      Login:
 *          type: object
 *          properties:
 *              username:
 *                      type: string
 *                      description: your username
 *              password:
 *                      type: string
 *                      description: your password
 *          required:
 *              - username
 *              - password
 *          example:
 *                  username: juan123
 *                  password: 1234sa
 */


/**
 * @swagger
 * tags:
 *  name: User
 *  description: User endpoints
 */

api.get('/test', userController.test);
/**
 * @swagger
 * /user/register:
 *  post:
 *      summary: Crear mi usuario
 *      tags: [User]
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/User'
 *      responses: 
 *          200:
 *              description: the user create succesfuly
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 *          500:
 *              description: some server error
 *      
 */

api.post("/register", userController.register);
/**
 * @swagger
 * /user/login:
 *  post:
 *      summary: Log in
 *      tags: [User]
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Login'
 *      responses: 
 *          200:
 *              description: log in successfuly
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Login'
 *          500:
 *              description: some server error
 */
api.post('/login', userController.login);

api.get('/**', (req, res) => {
    return res.send('ENPOINT NOT FOUND :(')
})

module.exports = api;