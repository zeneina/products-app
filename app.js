const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');

app.use(express.json());

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger');

mongoose.connect(process.env.MONGODB_URI)
  .then(
    () => { console.log("Connection to mongodb established")},
    err => { console.log("Failed to connect to mongodb", err)}
  );

const user = require('./routes/user.route');
const userProduct = require('./routes/user.products.routes')

app.use('/api/users', user)
app.use('/api/user-products', userProduct)

app.use('/api-docs', 
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument.options)
)

app.listen(port, ()=>{
  console.log("Server is up");
})