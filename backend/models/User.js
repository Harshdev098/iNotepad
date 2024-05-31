const { default: mongoose } = require('mongoose')
const moongose=require('mongoose')
const UserSchema=new moongose.Schema({
    name:{
        type: String,
    },
    email:{
        type: String,
    },
    password:{
        type: String,
    }
})
const User=mongoose.model('user',UserSchema)
module.exports=User