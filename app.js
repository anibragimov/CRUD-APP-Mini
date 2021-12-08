const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const morgan = require('morgan')
const hbs = require('handlebars')
const passport = require('passport')
const session = require('express-session')
const { Store } = require('express-session')
const { engine } = require('express-handlebars')
const connectDB = require('./config/db')
const bodyparser = require('body-parser')
const MongoStore = require('connect-mongo')(session)



//Load Config
dotenv.config({ path: './config/config.env'})

//passport 
require('./config/passport')(passport)

//Connecting To Mongo
connectDB()

//Load Express
const app = express()

app.use(bodyparser.urlencoded({extended : true}))

//Setting up Handlebars
app.engine('.hbs', engine({ defaultLayout:'main',extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set("views", "./views");

//Handlebars helpers
hbs.registerHelper("inc", function(value, options)
{
    return parseInt(value) + 1;
});

hbs.registerHelper("isMale", function(value, options)
{
    if(value == "Male"){
        return "checked"
    }
});

hbs.registerHelper("isFemale", function(value, options)
{
    if(value == "Female"){
        return "checked"
    }
});

hbs.registerHelper("isActive", function(value, options)
{
    if(value == "Active"){
        return "checked"
    }
});

hbs.registerHelper("isNotActive", function(value, options)
{
    if(value == "Inactive"){
        return "checked"
    }
});

//Session Midleware
app.use(session({
    secret: 'zara',
    resave:false,
    saveUninitialized: false,
    store: new MongoStore({mongooseConnection: mongoose.connection})

}))

//Passport Middleware
app.use(passport.initialize())
app.use(passport.session())



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