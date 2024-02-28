const { Schema, model } = require("mongoose");

const loginSchema = new Schema({
    name :String,
    email: String,
    contact: Number
})
 const LoginModel = model('login',loginSchema)
module.exports = LoginModel