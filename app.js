const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const cors = require('cors');
require("dotenv").config();
const port = process.env.PORT || 9650;
const session = require('express-session');
const dbConnect = require('./database/dbConnection');
// const HOST = '192.168.1.235';

// Connect to MongoDB
dbConnect();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const loginRouter = require('./routes/route');

app.use(
    cors({
      origin: "*",
      methods: ["GET, POST, PUT, DELETE"],
      credentials: true,
    })
);

//session middleware
app.use(session({
  secret: 'thisismysecrctekey',
  resave: false,
  saveUninitialized: true,
}));

app.get('/', (req,res)=>{
    res.send('Hello World');
})

app.use('/auth', loginRouter);

app.listen(port, (err)=>{
    if(err) throw err;
    console.log(`Server is running on port ${port}`);
})