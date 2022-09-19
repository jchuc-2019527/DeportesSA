'use strict'
const db = require('../db.json');
const fs = require('fs');
const uuid = require('uuid');
const json_string_sale = fs.readFileSync('src/sale.json', 'utf-8');
const sale = JSON.parse(json_string_sale);

exports.test = (req, res) =>{
    return res.send({message: 'Test saleController is running'});
}

exports.sale = (req, res) =>{
    try{
        const idProducts = req.body.idProducts;
       // const {id, date, invoiceName, quantity,precio} = req.body;
        for(const id of idProducts){
            const productExist = db.find(product => product.id === id.idP);
            if(!productExist){
                return res.status(400).send({message: 'Product not found'});
            }else{
                const  {total} =req.body; 
                const newSale = {
                    id: uuid.v4(),
                    date: new Date(),
                    invoiceName: req.body.invoiceName,
                    quantity: Number(id.quantity),
                    precio: Number(productExist.precio),
                    total,
                    idProducts,
                    statusSale: 'true'
                };
                if(!newSale.invoiceName){
                    return res.status(400).send({message: 'Invoice name is required'});
                }else{
                    const subtotal = productExist.precio * Number(id.quantity);
                    newSale.total = subtotal;
                    sale.push(newSale);
                    fs.writeFileSync('src/sale.json',JSON.stringify(sale), 'utf-8');
                    
                    if(newSale, productExist) {
                        let restaStock = productExist.stock;
                        let newStock = restaStock -  Number(id.quantity);
                        productExist.stock = newStock;
                        fs.writeFileSync('src/db.json', JSON.stringify(db), 'utf-8');
                       // return res.status(200).send({message: 'Sale succesfuly',})
                    }
                }
            }
        }
    }catch(err){
        console.log(err);
        return res.status(500).send({message: 'Error en el servidor (sale)'})
    }
}