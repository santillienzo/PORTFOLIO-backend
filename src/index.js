const express = require('express')
const app = express();
require('dotenv').config();
const path = require('path');

const cors = require('cors');

app.use(express.urlencoded({extended: false}));
app.use(express.json())
app.use(cors());


app.use('/', require('./routes/index'));

app.use(express.static(path.join(__dirname, 'public')));

app.listen(process.env.PORT || 5000, ()=>{
    console.log(`Server on port ${process.env.PORT}`)
});



