require("dotenv").config();

const express = require("express");
const app = express();
const massive = require("massive");
app.use(express.json());

const { SERVER_PORT, CONNECTION_STRING } = process.env;
const {getProducts,addProduct,deleteProduct,getProduct,updateProduct}= require('./productController')
massive(CONNECTION_STRING)
  .then(db => {
      app.set("db", db);
      console.log('Database is connected.')
    })
  .catch(() => console.log("Error in connecting to database"));

  //endpoints
  app.get('/api/products', getProducts);
  app.get('/api/products/:id',getProduct);
  app.post('/api/product',addProduct);
  app.delete('/api/products/:id',deleteProduct);
  app.put('/api/products/:id',updateProduct);

app.listen(SERVER_PORT, () => {
    console.log(`Server in listening on ${SERVER_PORT}`);
});
