'use strict'

const db = require('../db.json');
const fs = require('fs');
const uuid = require('uuid');
const res = require('express/lib/response');
const json_string_products = fs.readFileSync('src/db.json', 'utf-8');
const products = JSON.parse(json_string_products);

exports.test = (req, res) =>{
        return res.send({message: 'Test productsController is running...'});
}

exports.createProduct = (req, res) =>{
    try{
        const {id, nameProduct, precio, stock, description, idMarca, idProductLine} = req.body;
        if(!nameProduct || !precio || !stock || !description || !idMarca || !idProductLine) return res.send({message: 'Please added all paramas...'});
        let newProduct = {
            id: uuid.v4(),
            nameProduct,
            precio: Number(precio),
            stock: Number(stock),
            description,
            idMarca: req.body.idMarca,
            idProductLine: req.body.idProductLine,
            statusProduct :'true',
        };
        let productExist = db.find(product => product.nameProduct === newProduct.nameProduct);
        if(!productExist){
            products.push(newProduct);
            fs.writeFileSync('src/db.json', JSON.stringify(products), 'utf-8');
            if(products) return res.status(201).send({message: 'Product created', newProduct});
        }else{
            return res.send({message: 'Product name already exist'});
        }
    }catch(err) {
        console.log(err);
        return res.status(500).send({message: 'Error en el servidor (CreateProduct)'});
    }
}

exports.addedStock = (req, res) =>{ 
    try{
        const idProduct = req.params.idProduct;
        const productExist = db.find(product => product.id === idProduct);
        const {stock} = req.body;
        if(!stock) return res.send({message: 'Please added all parmas'});
        if(productExist){
            let newStock = productExist.stock + Number(req.body.stock);
            productExist.stock = newStock
            fs.writeFileSync('src/db.json', JSON.stringify(db), 'utf-8');
            return res.status(200).send({message: 'Modifed stock', productExist});
        }else{
            return res.send({message: 'Product not found'});
        }
    }catch(err){
        console.log(err);
        return res.status(500).send({message: 'Error en el servidor (Added stock)'})
    }
}

// Obtener solo un producto dado un ID
exports.product = (req, res) =>{
    try{
        const productExist = db.find(idProduct => idProduct.id === req.params.idProduct);
        if(!productExist) {
            return res.status(404).send({message: 'Product not found'});
        }else{
            return res.status(200).send({message: 'Product found', productExist})
        }
    }catch(err){
        console.log(err);
        return res.status(500).send({message: 'Error en el servidor (getProduct)'})
    }
}

exports.products = (req, res) =>{
    try{
        let products = db.filter(products => products.nameProduct);
        return res.status(200).send({message: 'Product found', products});
    }catch(err){
        console.log(err);
        return res.status(500).send({message: 'Error en el servidor (getProducts)'})
    }
}

exports.productD = (req, res) => {
    try{
        const productExist = db.find(product => product.id === req.params.idProduct);
        if(productExist){
            productExist.statusProduct = 'false'
            fs.writeFileSync('src/db.json', JSON.stringify(db), 'utf-8');
            return res.status(200).send({message: 'Product deleted', productExist})
        }else{
            return res.status(200).send({message: 'Product not found'})
        }
    }catch(err){
        console.log(err);
        return res.status(500).send({message: 'Error en el servido (deleteProduct)'})
    }
}

exports.productsDeleted = (req, res) => {
    try{
        let productsDeleted = db.filter(products => products.statusProduct === 'false');
        return res.status(200).send({message: 'Product found', productsDeleted})
    }catch(err) {
        console.log(err);
        return res.satus(500).send({message: 'Error en el servidor (getProductsDeleted)'})
    }
}

exports.productsActives = (req, res) => {
    try{
        let productsActives = db.filter(products => products.statusProduct === 'true');
        return res.status(200).send({message: 'Product found', productsActives});
    }catch(err){
        console.log(err);
        return res.satus(500).send({message: 'Error en el servidor (getProductsActives)'})
    }
}

exports.productU = (req, res) => {
    try{
    const idProduct = req.params.idProduct;
    const productExist = db.find(products => products.id === idProduct);
    if(productExist){
        const {stock} =req.body;
        if(stock) return res.send({message: 'The param stock cannot updated'})
        const {nameProduct, precio, description} = req.body;
        if(!nameProduct || !precio || !description) return res.send({message: 'Please added all parmas'});
        productExist.nameProduct = nameProduct;
        productExist.precio = Number(precio);
        productExist.description = description;
        fs.writeFileSync('src/db.json', JSON.stringify(db), 'utf-8');
        return res.status(200).send({message: 'Product updated succesfully', productExist});
    }else{
        return res.status(404).send({message: 'Product not found'});
    }
}catch(err){
    console.log(err);
    return res.status(500).send({message: 'Error en el servidor (productU)'})
}
}
