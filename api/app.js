const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
//Middlewares
app.use(cors())
app.use(bodyParser.json());

//routes
const routes = require('./routes/routes')
app.use('/', routes)

//Connect to db
mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser:true}, () => {
    console.log('Conected to db')
})

app.listen(3000)



/*const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');

//app.use(bodyParser.json());

const app = express();

app.get('/',(req, res)=>{
    res.send('hello!');
});

mongoose.connect(process.env.DB_CONNECTION, () =>
console.log('connected to DB!'));

app.listen(4000);

*/