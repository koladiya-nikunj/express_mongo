const LoginModel = require("../../models/loginModel")
const RegisterModel = require("../../models/registerModel")

const postLogin = async(req,res)=>{
    try {
        const {name,email,contact} = req.body
        const existingContact = await RegisterModel.findOne({contact})
        if(!existingContact){
            return res.status(409).json({message:`Number '${contact}' is not registered`})
        }
        if (!/^\d{10}$/.test(contact)) {
            console.log('contact number must be 10-digit number');
            return res.status(400).json({ error: 'contact number must be 10-digit number' });
        }
        const existingUser = await LoginModel.findOne({ contact });
        if (existingUser) {
            return res.status(400).json({ message: 'Login Successsfully!'});
        }
        const postUser = await LoginModel.create({name,email,contact})
       return res.status(201).json({message:'created',postUser})
    } catch (error) {
        return error
    }
}
module.exports = postLogin