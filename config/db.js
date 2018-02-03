const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://gautam:gautam@ds121898.mlab.com:21898/pusherpoll')
.then(()=>console.log('mongo connected...'))
.catch((err) => console.log(err));

