const express = require('express');
const app = express();
const logger = require('morgan');
const mongoose = require('mongoose');
var PORT = process.env.PORT || 8000;
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const expressValidator = require('express-validator');
const session = require('express-session');
const server = require("http").createServer(app);
const passport = require('passport');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
var socketIO = require("socket.io")(server);
const openapidoc = require('./swaggerDocs')
var socketID = "";


const swaggerOptions = {
  definition : {
    info : {
      title : 'FoodFactory API',
      description : 'FoodFactory API Informations'
    },
    servers : ["http:///localhost:8000"]
  },
  apis: ['app.js','./routes/users.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(openapidoc));

//MongoDB config
const db = require('./config/db');
mongoose.connect(db.MongoURI || 'mongodb://localhost/foodfactory',{useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
   .then(() => console.log('MongoDB connected'))
   .catch(err => console.log(err));
require('./config/passport')(passport);

//Routes
const users = require('./routes/users');
const food = require('./routes/food');
const ingredients = require('./routes/ingredients');
const orders = require('./routes/orders');



app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
// app.use(expressValidator());
app.use(fileUpload());
app.use(session({
  secret : 'appSecret123456',
  resave: false,
  saveUninitialized: true
}))
app.use("/public",express.static(__dirname+"/public"));

app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use('/',users)
app.use('/api/food',food);
app.use('/api/ingredients',ingredients)
app.use('/api/orders',orders); 




//catch errors
app.use((req,res,next)=>{
  const err = new Error('not found');
  err.status = 404;
  next(err);
})

//Error Handler
app.use((err,req,res,next)=>{
  console.log("---------route error handler----------");
  console.log(err);
  const status = err.status || 500;
  res.status(status).json({
    status: status,
    msg : err.message
  })
 
})




socketIO.on("connection", function (socket) {
	console.log("User connected", socket.id);
	socketID = socket.id;
})

server.listen(PORT, function () {
  console.log("Server started in port 8000");
})
