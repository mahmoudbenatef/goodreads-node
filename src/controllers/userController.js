'use strict';
const UserModel = require("../models/userModel")
const bcrypt = require('bcrypt'),
jwt = require('jsonwebtoken')

var mongoose = require('mongoose')

exports.register = async function(req, res) {
    const userData = req.body
    userData.hash_password = bcrypt.hashSync(req.body.password, 10);

    const userInstance = new UserModel({name:userData.name,email:userData.email
        ,lastname:userData.lastname,gender:userData.gender,password:userData.hash_password
        ,role:userData.role
    })
    try{
        let user = await userInstance.save()
        user.hash_password = undefined;
        return res.status(200).json(user)
    }
    catch (err){
        return res.status(500).json(err)
    }
};

exports.sign_in = function(req, res) {
    UserModel.findOne({
        email: req.body.email
    }, function(err, user) {
        if (err) throw err;
        if (!user || !user.comparePassword(req.body.password)) {
            return res.status(401).json({ message: 'Authentication failed. Invalid user or password.' });
        }
        return res.json({ token: jwt.sign({ email: user.email, fullName: user.fullName, _id: user._id }, 'RESTFULAPIs'),user: user });
    });
};

exports.loginRequired = function(req) {
    if (req.user) {
       return  true
    } else {
        return false

    }
};


exports.users= async function (request,response,next){
        let is_authed = this.loginRequired(request)
        if (is_authed){
            try {
                const users = await  UserModel.find({})
                return   response.status(200).json(users)
            }
            catch (err){
                return  response.end("bye")
            }
        }
        else {
            return response.status(401).json({ message: 'Unauthorized user!!' });

        }
}

exports.getUser= async function  (request,response){
    const userData = request.body
    console.log(request.params)
     try {
         console.log(request.params.id)
        const userData = await  UserModel.findOne({_id:request.params.id})
       console.log()
         return response.json(userData);
     }
    catch (err){
        response.json({msg:"error", data:err})
    }
}


 exports.edit= async function  (request,response){
    const userData = request.body
    let userObj = {}
    if(userData.name) userObj.name=userData.name
    // if(userData.lastname) userObj.lastname=userData.lastname
    // if(userData.dob) userObj.dob=userData.dob
    if(userData.email) userObj.email=userData.email
     try {
         console.log(request.params.id)
       const updated = await  UserModel.updateOne({_id:request.params.id},userObj)

         return response.json({msg:"update successfully",data:userData})
     }
    catch (err){
        response.json({msg:"error", data:err})
    }
}

exports.delete= async function(req,res){
try {
    const deletedUser=await UserModel.deleteOne({_id:req.params.id})
    console.log("deleted")
    return  res.json("delted success")
}
catch (err){
    return  res.json(err)
}
}
exports.search= async function(req,res){
    try {
        console.log(req.body.name);
        const users =await UserModel.find({$or: [{"name" : {$regex : `.*${req.body.name}.*`}},{"email" : {$regex : `.*${req.body.name}.*`}}]})

        console.log("deleted")
        return  res.json(users)
    }
    catch (err){
        return  res.json(err)
    }
    }
exports.show = async function(req,res){
}
// )
