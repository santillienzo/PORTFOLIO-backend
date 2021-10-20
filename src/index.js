const express = require('express')
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');



//Use Method libs
const app = express();
require('dotenv').config();

//Middlewares
app.use(express.urlencoded({extended: false}));
app.use(express.json())
app.use(cors());
app.use(morgan('dev'));

//Database setup
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{console.log("Succesfully conection")})


//Routes setup
app.use('/email', require('./routes/email'));
app.use('/api/works', require('./routes/works'));
app.use('/api/technologies', require('./routes/technology'));


//Listen to port
app.use(express.static(path.join(__dirname, 'public')));
app.listen(process.env.PORT || 5000, ()=>{
    console.log(`Server on port ${process.env.PORT}`)
});



