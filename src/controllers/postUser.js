const LoginModel = require('../models/loginModel');

const postUser = async (req, res) => {
    try {
        const { email, contact, name } = req.body;

        const existingUser = await LoginModel.findOne({ contact });
        if (existingUser) {
            console.log('Mobile number already exists');
            return res.status(400).json({ error: 'Mobile number already exists' });
        }
        
        if (!/^\d{10}$/.test(contact)) {
            console.log('contact number must be 10-digit number');
            return res.status(400).json({ error: 'contact number must be 10-digit number' });
        }

        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|co\.in)$/i.test(email)) {
            console.log('Invalid email address');
            return res.status(400).json({ error: 'Invalid email address' });
        }

        const savedUser = await LoginModel.create({email, contact, name});
        console.log('User created successfully:', savedUser);
        res.status(201).json({ message: 'User created successfully', user: savedUser });
    } catch (error) {
        if (error.code === 11000 && error.keyPattern && error.keyValue) {
            console.log('Email address already exists');
            return res.status(400).json({ error: 'Email address already exists' });
        } else {
            console.error('Error creating user:', error);
            res.status(500).json({ error: 'Failed to create user' });
        }
    }
};

module.exports = postUser;
