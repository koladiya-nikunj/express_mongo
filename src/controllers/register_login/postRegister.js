const LoginModel = require("../../models/loginModel");
const RegisterModel = require("../../models/registerModel");

const postRegister = async (req, res) => {
    try {
        const { name, email, contact } = req.body;

        if (!contact) {
            return res.status(400).json({ error: 'Contact is required for register post' });
        }
        if (!/^\d{10}$/.test(contact)) {
            console.log('contact number must be 10-digit number');
            return res.status(400).json({ error: 'contact number must be 10-digit number' });
        }
        const existingUser = await RegisterModel.findOne({ contact });
        if (existingUser) {
            return res.status(400).json({ message: 'Registration Successfully!'});
        }
        // Create new user in RegisterModel
        const newUser = await RegisterModel.create({ name, email, contact });
        return res.status(201).json({ message: 'User created', user: newUser });
    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({ error: 'Failed to create user' });
    }
};

module.exports = postRegister;
