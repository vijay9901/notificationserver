const mongoose = require('mongoose')

mongoose 
 .connect('mongodb://localhost:27017/notifications', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,   })   
 .then(() => console.log("Database connected!"))
 .catch(err => console.log(err));