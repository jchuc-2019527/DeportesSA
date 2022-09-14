'use strict'


const db = require('../db.json');
const fs = require('fs');
const json_string_users = fs.readFileSync('src/db.json', 'utf-8');
const user = JSON.parse(json_string_users);
const { encryptPassword, checkPassword, searchUsername} = require('../utils/validate.util');
const  {createToken}  = require('../services/createToken.services');
const uuid  = require('uuid');
//const json_users = fs.readFileSync('../../config/db.json', 'utf-8');
//let users = JSON.parse(json_users);


exports.test = (req, res)=>{ 
     return res.send({message: 'test running'});
}

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
exports.register = async (req, res)=>{
    try{

        const {id, name,username, email, password} = req.body;
        if (!name || !username || !email || !password) {
            return res.send({message: 'Please added all params'});
        }
        let newUser = {
            id: uuid.v4(),
            name,
            username,
            email,
            password,
            role: 'ROLE_USER'
        };
        let userExist = db.find(user => user.username === newUser.username);
        if(!userExist){
            newUser.password = await encryptPassword(newUser.password);
            user.push(newUser);
            fs.writeFileSync('src/db.json', JSON.stringify(user), 'utf-8');
            if(user) {
                return res.send({message: 'user created..', newUser});
            }else {
                return res.send({message: 'user not registered'});
            }
        }else{
            return res.send({message: 'user already exist'});
        }
  
        //return res.send({message: 'User created'});

  /*      let data = fs.readFileSync('src/db.json', 'utf-8');
        let myObject = JSON.parse(data);
        const params = req.body;
        const user = {
            name: params.name,
            username: params.username,
            email: params.email,
            password: params.password,
            role: 'ROLE_USER',
        };
        myObject.push(user);
        let newUser = JSON.stringify(myObject);
        fs.writeFileSync('src/db.json', newUser);
        return res.status(200).send({message: 'User registered successfully'});
*/
    }catch(err){
        console.log(err);
        return res.status(500).send({message:'Error en el servidor'});
    }
}

exports.login = async (req, res)=>{
    try{
        const {username, password} = req.body;
        if ( !username || !password  ) {
            return res.send({message: 'Please added all params'});
        }
        const data ={
            username,
            password
        };
        let userLogin =  db.find(user => user.username === data.username);
        if(userLogin && await checkPassword(data.password, userLogin.password)){
            const token = await createToken(userLogin);
            return res.status(200).send({token, userLogin, message: 'User logg in successfully'});
        }else{
            return res.status(404).send({message: 'Username and password incorrect'});
        }
    }catch (err){
        console.log(err);
        return res.status(500).send({message:'Error en el servidor (login)'});
    }
}