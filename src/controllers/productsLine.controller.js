'use strict'

const db = require('../db.json');
const fs = require('fs');
const uuid = require('uuid');
const json_string_productsLine = fs.readFileSync('src/db.json', 'utf-8');
const productsLine = JSON.parse(json_string_productsLine);

exports.test = (req, res)=>{
    return res.send({message: 'test productsLine running'});
}

exports.createProductLine = (req, res)=>{
    try{
        const {id, nameLine, description} = req.body;
        if(!nameLine || !description) return res.send({message: 'Please added all params'});
        let newProductsLine = {
            id: uuid.v4(),
            nameLine,
            description,
            statusLine: 'true',
        };
        let productsLineExist = db.find(productsLine => productsLine.nameLine === newProductsLine.nameLine);
        if(!productsLineExist){
            productsLine.push(newProductsLine);
            fs.writeFileSync('src/db.json', JSON.stringify(productsLine), 'utf-8');
            if(productsLine) return res.send({message: 'ProductsLine created', newProductsLine});
        }else{
            return res.send({message: 'ProductsLine already exist'});
        }
    }catch(err){
        console.log(err);
        return res.status(500).send({message:'Error en el servidor (Create productsLine)'});
    }
}

// Obtener solo una linea de producto dado el ID
exports.getProductLine = (req, res)=>{
    try{
        const idProductLine = req.params.idProductLine;
        if(idProductLine){
            let productLineExist = db.find(productLine => productLine.id === idProductLine);
            return res.status(200).send({message:'ProductLine found', productLineExist});
        }else{
            return res.status(500).send({message: 'Product line not found'});
        }
    }catch(err){
        console.log(err);
        return res.status(500).send({message:'Error en el servidor (Get productsLine)'});
    }
}

exports.getProductsLine = (req, res)=>{
    try{
        let productsLine = db.filter(productsLine => productsLine.nameLine)
        return res.status(200).send({message:'ProductsLine found', productsLine});
    }catch(err){
        console.log(err);
        return res.status(500).send({message:'Error en el servidor (Get productsLine)'});
    }
}

exports.deleteProductLine = (req, res)=>{
    try{
        const idProductLine = req.params.idProductLine;
        const productLineExist = db.find(productLine => productLine.id === idProductLine);
        if(productLineExist){
            productLineExist.status = 'false';
            fs.writeFileSync('src/db.json', JSON.stringify(db), 'utf-8');
            return res.status(200).send({message:'ProductLine deleted', productLineExist});
        }else{
            return res.send({message: 'ProductLine not found'});
        }
    }catch(err){
        console.log(err);
        return res.status(500).send({message:'Error en el servidor (Delete productsLine)'});
    }
}

exports.getProductsLineDeleted = (req, res)=>{
    try{
        let productsLine = db.filter(productsLine => productsLine.status === 'false');
        return res.status(200).send({message:'ProductsLine found', productsLine});
    }catch(err){
        console.log(err);
        return res.status(500).send({message:'Error en el servidor (Get productsLine deleted)'});
    }
}

exports.getProductsLineActives = (req, res)=>{
    try{
        let productsLine = db.filter(productsLine => productsLine.statusLine === 'true');
        return res.status(200).send({message:'ProductsLine found', productsLine});
    }catch(err){
        console.log(err);
        return res.status(500).send({message:'Error en el servidor (Get productsLine actives)'});
    }
}

exports.updateProductLine = (req, res)=>{
    try{
        const idProductLine = req.params.idProductLine;
        const productLineExist = db.find(productLine => productLine.id === idProductLine);
        if(productLineExist){
            const {nameLine, description, statusLine} = req.body;
            if(!nameLine || !description || !statusLine) return res.send({message: 'Please added all params'});
            productLineExist.nameLine = nameLine;
            productLineExist.description = description;
            productLineExist.statusLine = statusLine;
            fs.writeFileSync('src/db.json', JSON.stringify(db), 'utf-8');
            return res.status(200).send({message:'ProductLine updated', productLineExist});
        }else{
            return res.send({message: 'ProductLine not found'});
        }
    }catch(err){
        console.log(err);
        return res.status(500).send({message:'Error en el servidor (Update productsLine)'});
    }
}