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
        },
        avatar:{type:String,required:true}
    },
    // {
    //     writeConcern: {
    //         w: 'majority',
    //         j: true,
    //         wtimeout: 1000
    //     }
    // }
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
// UserScheme.methods.calcAge =  function () {
//     var ageDifMs = Date.now() - this.dob.getTime();
//     console.log("ageDifMs",ageDifMs)
//     var ageDate = new Date(ageDifMs); // miliseconds from epoch
//     console.log("ageDifMs",ageDifMs)
//     return Math.abs(ageDate.getUTCFullYear() - 1970);
// }
// UserScheme.statics.search = function search (gender, cb) {
//     this.count({gender:gender},cb);
// }

const UserModel = mongoose.model("User", UserScheme)

module.exports = UserModel
