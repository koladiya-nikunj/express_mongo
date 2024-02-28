const { Schema, model } = require("mongoose");

const registerSchema = new Schema({
    name :String,
    email: String,
    contact: Number
})
 const RegisterModel = model('register', registerSchema)
module.exports = RegisterModel