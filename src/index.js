const express = require('express')
const app = express();
const cors = require('cors')
require('dotenv').config();
const path = require('path');

app.use(express.urlencoded({extended: false}));
app.use(express.json())
app.use(cors());


app.use('/', require('./routes/index'));

app.use(express.static(path.join(__dirname, 'public')));

app.set('port', process.env.PORT || 5000);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});

app.listen(app.get('port'), ()=>{
    console.log(`Server on port ${app.get('port')}`)
});



