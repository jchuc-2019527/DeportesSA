const bcrypt = require('bcrypt-nodejs');
const db = require('../db.json');

exports.encryptPassword = async (password)=>{
    try{
        return bcrypt.hashSync(password)
    }catch(err){
        console.log(err);
        return res.status(500).send({message:'Error en el servidor (Encrypt password)'});
    }
}

exports.checkPassword = async (password, hashSync)=>{
    try{
        return bcrypt.compareSync(password, hashSync);
    }catch(err){
        console.log(err);
        return res.status(500).send({message:'Error en el servidor (Check password)'});
    }
}
