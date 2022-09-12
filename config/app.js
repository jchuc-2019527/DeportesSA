'use strict'

const bodyParser = require('body-parser');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const port = 3200;
const userRoutes = require('../src/routes/user.routes');
const brandRoutes = require('../src/routes/brand.routes');
const productsLineRoutes = require('../src/routes/productsLine.routes');
const productsRouter = require('../src/routes/products.routes');
const saleRouter = require('../src/routes/sale.routes');


const app = express();
 app.use(bodyParser.urlencoded({ extended: false }));
 app.use(bodyParser.json());
 app.use(helmet({}));
 app.use(cors());

 app.use('/user', userRoutes);
 app.use('/brand', brandRoutes);
 app.use('/productsLine', productsLineRoutes);
 app.use('/products', productsRouter);
 app.use('/sale', saleRouter);

exports.initServer = ()=> app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
});