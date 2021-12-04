const express = require('express')
const path = require('path')
const dotenv = require('dotenv')
const morgan = require('morgan')
const { engine } = require('express-handlebars')
const connectDB = require('./config/db')

//Load Config
dotenv.config({ path: './config/config.env'})

//Connecting To Mongo
connectDB()

//Load Express
const app = express()

//Setting up Handlebars
app.engine('.hbs', engine({ defaultLayout:'main',extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set("views", "./views");

// Morgan http logger 
if (process.env.NODE_ENV == "development"){
    app.use(morgan('dev'))
}

//Static folders
app.use(express.static(path.join(__dirname,'public')))


//Routes
app.use('/', require('./routes/index.js'))

//Port
const PORT = process.env.PORT || 5000

//Runnig the server
app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT} `))