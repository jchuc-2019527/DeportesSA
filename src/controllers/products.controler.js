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
        const {id, nameProduct, precio, stock, description} = req.body;
        if(!nameProduct || !precio || !stock || !description) return res.send({message: 'Please added all paramas...'});
        let newProduct = {
            id: uuid.v4(),
            nameProduct,
            precio: Number(precio),
            stock: Number(stock),
            description,
            statusProduct :'true',
            idMarca: req.params.idMarca,
            idProductLine: req.params.idProductLine
        };
        let productExist = db.find(product => product.nameProduct === newProduct.nameProduct);
        if(!productExist){
            products.push(newProduct);
            fs.writeFileSync('src/db.json', JSON.stringify(products), 'utf-8');
            if(products) return res.send({message: 'Product created', newProduct});
        }else{
            console.log(productExist);
            let newStock = productExist.stock + Number(newProduct.stock);
            fs.writeFileSync('src/db.json', JSON.stringify(db), 'utf-8');
            return res.send({message: 'Product name already exist, added products to existing product name.', newStock, productExist})
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
exports.getProduct = (req, res) =>{
    try{
        const idProduct = req.params.idProduct;
        if(idProduct){
            var productExists = db.find(product => product.id === idProduct);
            if(!productExists) return res.send({message: 'Product not found'})
            return res.status(200).send({message: 'Product found', productExists})
        }else{
            return res.status(500).send({message: 'Added the product.'})
        }
    }catch(err){
        console.log(err);
        return res.status(500).send({message: 'Error en el servidor (getProduct)'})
    }
}

exports.getProducts = (req, res) =>{
    try{
        let products = db.filter(products => products.nameProduct);
        return res.status(200).send({message: 'Product found', products});
    }catch(err){
        console.log(err);
        return res.status(500).send({message: 'Error en el servidor (getProducts)'})
    }
}

exports.deleteProduct = (req, res) => {
    try{
        const idProduct = req.params.idProduct;
        const productExist = db.find(product => product.id === idProduct);
        if(productExist){
            productExist.statusProduct = 'false'
            fs.writeFileSync('src/db.json', JSON.stringify(db), 'utf-8');
            return res.status(200).send({message: 'Product deleted', productExist})
        }else{
            return res.satus(200).send({message: 'Product nor found'})
        }
    }catch(err){
        console.log(err);
        return res.status(500).send({message: 'Error en el servido (deleteProduct)'})
    }
}

exports.getProductsDeleted = (req, res) => {
    try{
        let productsDeleted = db.filter(products => products.statusProduct === 'false');
        return res.status(200).send({message: 'Product found', productsDeleted})
    }catch(err) {
        console.log(err);
        return res.satus(500).send({message: 'Error en el servidor (getProductsDeleted)'})
    }
}

exports.getProductsActives = (req, res) => {
    try{
        let productsActives = db.filter(products => products.statusProduct === 'true');
        return res.status(200).send({message: 'Product found', productsActives});
    }catch(err){
        console.log(err);
        return res.satus(500).send({message: 'Error en el servidor (getProductsActives)'})
    }
}

exports.updateProduct = (req, res) => {
    const idProduct = req.params.idProduct;
    const productExist = db.find(products => products.id === idProduct);
    if(productExist){
        const {stock} =req.body;
        if(stock) return res.send({message: 'The param stock cannot updated'})
        const {nameProduct, precio, description, statusProduct} = req.body;
        if(!nameProduct || !precio || !description || !statusProduct) return res.send({message: 'Please added all parmas'});
        productExist.nameProduct = nameProduct;
        productExist.precio = Number(precio);
        productExist.description = description;
        productExist.statusProduct = statusProduct;
        fs.writeFileSync('src/db.json', JSON.stringify(db), 'utf-8');
        return res.status(200).send({message: 'Product updated succesfully', productExist});
    }else{
        return res.send({message: 'Product not found'});
    }
}
