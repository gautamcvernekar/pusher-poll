const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const poll = require('./routes/poll.js')
const app = express();
require('./config/db');

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(cors());
app.use('/poll',poll);

const port = 3000;

app.listen(process.env.PORT || port,()=>console.log("server initialized...."));


