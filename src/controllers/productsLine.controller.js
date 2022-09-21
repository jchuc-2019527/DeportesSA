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
            if(productsLine) return res.status(201).send({message: 'ProductsLine created', newProductsLine});
        }else{
            return res.send({message: 'ProductsLine already exist'});
        }
    }catch(err){
        console.log(err);
        return res.status(500).send({message:'Error en el servidor (Create productsLine)'});
    }
}

// Obtener solo una linea de producto dado el ID
exports.productLine = (req, res)=>{
    try{
        const productLineExists = db.find(idProductLine => idProductLine.id === req.params.idProductLine);
        if(!productLineExists){
            return res.status(404).send({message: 'Brand not found'});
        }else{
            return res.status(200).send({message: 'Produc line found',  productLineExists})
        }
    }catch(err){
        console.log(err);
        return res.status(500).send({message:'Error en el servidor (Get productsLine)'});
    }
}

exports.productsLine = (req, res)=>{
    try{
        let productsLine = db.filter(productsLine => productsLine.nameLine)
        return res.status(200).send({message:'ProductsLine found', productsLine});
    }catch(err){
        console.log(err);
        return res.status(500).send({message:'Error en el servidor (Get productsLine)'});
    }
}

exports.productLineD = (req, res)=>{
    try{
        const idProductLine = req.params.idProductLine;
        const productLineExist = db.find(productLine => productLine.id === idProductLine);
        if(productLineExist){
            productLineExist.status = 'false';
            fs.writeFileSync('src/db.json', JSON.stringify(db), 'utf-8');
            return res.status(200).send({message:'ProductLine deleted', productLineExist});
        }else{
            return res.status(404).send({message: 'ProductLine not found'});
        }
    }catch(err){
        console.log(err);
        return res.status(500).send({message:'Error en el servidor (Delete productsLine)'});
    }
}

exports.productsLineDeleted = (req, res)=>{
    try{
        let productsLine = db.filter(productsLine => productsLine.status === 'false');
        return res.status(200).send({message:'ProductsLine found', productsLine});
    }catch(err){
        console.log(err);
        return res.status(500).send({message:'Error en el servidor (Get productsLine deleted)'});
    }
}

exports.productsLineActives = (req, res)=>{
    try{
        let productsLine = db.filter(productsLine => productsLine.statusLine === 'true');
        return res.status(200).send({message:'ProductsLine found', productsLine});
    }catch(err){
        console.log(err);
        return res.status(500).send({message:'Error en el servidor (Get productsLine actives)'});
    }
}

exports.productLineU = (req, res)=>{
    try{
        const idProductLine = req.params.idProductLine;
        const productLineExist = db.find(productLine => productLine.id === idProductLine);
        if(productLineExist){
            const {nameLine, description} = req.body;
            if(!nameLine || !description) return res.send({message: 'Please added all params'});
            productLineExist.nameLine = nameLine;
            productLineExist.description = description;
            fs.writeFileSync('src/db.json', JSON.stringify(db), 'utf-8');
            return res.status(200).send({message:'ProductLine updated', productLineExist});
        }else{
            return res.status(404).send({message: 'ProductLine not found'});
        }
    }catch(err){
        console.log(err);
        return res.status(500).send({message:'Error en el servidor (Update productsLine)'});
    }
}