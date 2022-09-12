'use strict'

const jwt = require('jwt-simple');
const moment = require('moment');
const secret = 'clave_secreta';

exports.createToken = async (user)=>{
    try{
        const payload ={
            sub: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            password: user.password,
            role: user.role,   
            iat: moment().unix(),
            exp: moment().add(5, 'hours').unix()
        }
        return jwt.encode(payload, secret);

    }catch(err){
        console.log(err);
        return res.status(500).send({message:'Error en el servidor (Create token)'});
    }
}