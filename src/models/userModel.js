const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const UserScheme = new mongoose.Schema({
        firstname: String,
        lastname: String,
        password: String,
        gender: {
            type: String,
            required: true,
            enum: ['Male', 'Female']
        },
        role: {
            type: String,
            required: true,
            enum: ['admin', 'user'],
            default: 'user'
        },
        email: {
            type: String,
            unique: true,
            lowercase: true,
            trim: true,
            required: true
        },
        created: {
            type: Date,
            default: Date.now
        }
    }, 
)


UserScheme.methods.comparePassword =   function(password,hash_password) {
    console.log("comparing")
    try {
        return   bcrypt.compareSync(password, this.password);
    }
    catch (err){
        console.log(err)
    }
};

const UserModel = mongoose.model("User", UserScheme)

module.exports = UserModel