"use strict";

const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const helmet = require("helmet");
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const port = 3200;
const userRoutes = require("../src/routes/user.routes");
const brandRoutes = require("../src/routes/brand.routes");
const productsLineRoutes = require("../src/routes/productsLine.routes");
const productsRouter = require("../src/routes/products.routes");
const saleRouter = require("../src/routes/sale.routes");
const path = require("path");
const swaggerSpec = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Node js",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:3200",
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};
 const swaggerSpects = swaggerJsDoc(swaggerSpec);
 app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpects));


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet({}));
app.use(cors());

app.use("/user", userRoutes);
app.use("/brand", brandRoutes);
app.use("/productsLine", productsLineRoutes);
app.use("/products", productsRouter);
app.use("/sale", saleRouter);


app.get('/', (req,res) =>{
    res.send('WELCOME TO MY API :D')
})

app.get('/**', (req, res) => {
    res.send('ENPOINT NOT FOUND :(')
})
exports.initServer = () =>
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
