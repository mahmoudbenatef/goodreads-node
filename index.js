const express = require("express")
const mongoose = require('mongoose');
const jsonwebtoken = require("jsonwebtoken");

const cors = require('cors')
const port = 3001;
const app = express()
var userHandlers = require('./src/controllers/userController.js');
mongoose.connect(
    // process.env.MONGO_CONNECTION_STRING+"/goodreads"|| 
    "mongodb://localhost:27017/goodreads",{useNewUrlParser:true,useUnifiedTopology:true},(err)=>{
    if (err ) 
    {
        console.log("falied to connect mongo")
        console.log(process.env.MONGODB_URI, "monkooooo")
    }
    else
        console.log("connected successfully to mongo")
})
const userRouter = require("./src/routes/userRoute")

app.use(express.json())
app.use(cors())
app.use(function(req, res, next) {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
        jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function(err, decode) {
            if (err) req.user = undefined;
            req.user = decode;
            next();
        });
    } else {
        req.user = undefined;
        next();
    }
});
app.use("/users", userRouter)
app.get('/',(req,res)=>{
    res.end("hello at home page atef")
})
//     .post(userHandlers.register);
app.listen(process.env.PORT ||port,(err)=>{
    if (err) console.log("error in connecting")
    else
        console.log("connected successfully on port "+port)
})
