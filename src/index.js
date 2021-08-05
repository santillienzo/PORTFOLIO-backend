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


app.listen(app.get('port'), ()=>{
    console.log(`Server on port ${app.get('port')}`)
});



