const express = require('express')
const app = express();
require('dotenv').config();
const path = require('path');
const cors = require('cors');
app.use(cors());

app.use(express.urlencoded({extended: false}));
app.use(express.json())


app.use('/', require('./routes/index'));

app.use(express.static(path.join(__dirname, 'public')));

app.set('port', process.env.PORT || 5000);




app.listen(app.get('port'), ()=>{
    console.log(`Server on port ${app.get('port')}`)
});



