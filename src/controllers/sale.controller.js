'use strict'
const db = require('../db.json');
const fs = require('fs');
const uuid = require('uuid');
//const Date = require('date-and-time')
const json_string_sale = fs.readFileSync('src/db.json', 'utf-8');
const sale = JSON.parse(json_string_sale);

exports.test = (req, res) =>{
    return res.send({message: 'Test saleController is running'});
}

exports.sale = (req, res) =>{
    try{
        //const idProducts = req.body.idProducts;
        //const productExist = db.find(product => product.id === idProduct);
        const {id, date, invoiceName, quantity, total, subTotal} = req.body;
        if(!quantity || !invoiceName) return res.send({message: 'Please added all params'});
        if(productExist){
            let newSale = {
                id: uuid.v4(),
                date: new Date(),
                idProducts: [],
                invoiceName,
                quantity: Number(quantity),
                subTotal: Number(subTotal),
                //total: Number(total),
            };
            for(let idP of idP){
                console.log(idP);
            let subtotal = productExist.precio * Number(req.body.quantity);
            newSale.subTotal = subtotal;
           // productExist.total = total
            sale.push(newSale);
            fs.writeFileSync('src/db.json', JSON.stringify(sale), 'utf-8');
            let restaStock = productExist.stock;
            console.log(restaStock);
            let newStock = restaStock -  Number(req.body.quantity);
             productExist.stock = newStock;
            fs.writeFileSync('src/db.json',JSON.stringify(db), 'utf-8');
            console.log(newStock);
            }
            return res.send({message: 'Succesful purchase', newSale, productExist})
        }else{ 
            return res.send({message: 'Product nor found'});
        }
        

    }catch(err){
        console.log(err);
        return res.status(500).send({message: 'Error en el servidor (sale)'})
    }
}