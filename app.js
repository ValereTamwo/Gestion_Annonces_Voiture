const express = require("express")
const router = require("./Routes/Router")
const swagger = require("./swager")
const app = express()


const bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.use("/assets", express.static("public"));


  
app.use('/api-docs',swagger.serve,swagger.set);


app.use(bodyParser.json());
app.use(router)



module.exports = app