const express = require('express')
const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.json())

const userroute = require('./routes/userRoute')
const bookroute = require('./routes/bookRoute')

app.use('/api',userroute);
app.use('/api',bookroute);

module.exports=app;
