const LoginModel = require("../models/loginModel");

const patchUser = async (req, res) => {
    try {
        const { email, name, contact } = req.body;
        if (!contact) {
            return res.status(400).json({ error: 'contact is required for updating post' });
        }

        if (contact) {
            if (contact.toString().length !== 10) {
                return res.status(400).json({ error: 'Contact number must be 10 digits' });
            }
        }

        const userData = await LoginModel.findOneAndUpdate({ contact }, {email, name, contact}, { new: true });
        if (!userData) {
            return res.status(404).json({ error: `Number '${contact}' not found` });
        }

        console.log('Post updated successfully:', userData);
        res.status(200).json({message:'Post updated successfully:',userData});
    } catch (error) {
        console.error('Error updating post:', error);
        res.status(500).json({ error: 'Failed to update post' });
    }
}
module.exports = patchUser