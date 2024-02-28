const LoginModel = require('../models/loginModel');

const putUser = async (req, res) => {
    try {
        const { name, email, contact } = req.body;

        if (!contact) {
            return res.status(400).json({ error: 'contact is required for updating post' });
        }

        if (contact && contact.toString().length !== 10) {
            return res.status(400).json({ error: 'Contact number must be 10 digits' });
        }

        const putData = await LoginModel.findOneAndReplace({ contact }, { name, email, contact }, { new: true });
        if (!putData) {
            return res.status(404).json({ error:  `Number '${contact}' not found`  });
        }

        console.log('Put data successfully:', putData);
        res.status(200).json({message:'Put data successfully:', putData});
    } catch (error) {
        console.error('Error updating post:', error);
        res.status(500).json({ error: 'Failed to update post' });
    }
}
module.exports = putUser