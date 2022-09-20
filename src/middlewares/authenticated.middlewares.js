'use strict'

const jwt = require('jwt-simple');
const moment = require('moment');
const secret = 'clave_secreta';

exports.ensureAuth = async (req, res, next)=>{
    
    const bearerAuth = req.headers.authorization;
    if(!bearerAuth) return res.status(403).send({message: 'The requested does not contain the authentication header'});
    if( bearerAuth !== 'undefined'){
        const bearer = bearerAuth.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    }else{
       return res.status(403).send({message: 'Token is not valid or expired'});
    }
    
    /*if(req.headers.authorization){
        try {
            let token = req.headers.authorization.replace(/['"]+/g, '');
            var payload = jwt.decode(token, secret);
        } catch (error) {
            console.log(error);
            return res.status(401).send({message:'Token is not valid or expired'})
        }
        req.user = payload;
        next();
    }else{
        return res.status(403).send({message:'The requested does not contain the authentication header'});
    }*/
    
};

exports.isAdmin = (req, res, next)=>{
    try{
        const user = req.user;
        if(user.role === 'ROLE_ADMIN'){
            return next();
        }else{
            return res.status(403).send({message: 'User unauthorized'});
        }
    }catch(err){
        console.log(err);
        return res.status(500).send({message:'Error en el servidor (Is admin)'});
    }
}
