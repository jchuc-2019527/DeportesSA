'use strict'
const db = require('../db.json');
const invoiceUser = require('../sale.json');
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
           const factura = [];
        for(const id of idProducts){
            const productExist = db.find(product => product.id === id.idP);
            if(!productExist){
                return res.status(404).send({message: 'Product not found'});
            }else{
                const  {total} =req.body; 
                const newSale = {
                    id: uuid.v4(),
                    idUser: req.body.idUser,
                    date: new Date(),
                    invoiceName: req.body.invoiceName,
                    quantity: Number(id.quantity),
                    precio: Number(productExist.precio),
                    total,
                    idProducts,
                    statusSale: 'true'
                };
                if(!newSale.invoiceName || !newSale.quantity || !req.body.idUser){
                    return res.status(400).send({message: 'Invoice name, quantity and params idUser is required'});
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
                        factura.push(newSale)  
                    }
                }
            }
        }
        return res.status(200).send({newArray})
    }catch(err){
        console.log(err);
        return res.status(500).send({message: 'Error en el servidor (sale)'})
    }
}

exports.salesUser = (req, res) => {
    try{
        let userSale = invoiceUser.find(user => user.idUser === req.params.idUser)
        if(userSale !== req.params.idUser){
            return res.status(404).send({message:'User not found'});
        }else{
            let userSalesS = invoiceUser.filter(id => id.idUser)
            return res.status(200).send({message: 'Invoices user founds', userSalesS})
        }
    }catch (err){
        console.log(err);
        return res.status(500).send({message: 'Error en el servidor (getSalesUser)'})
    }
}