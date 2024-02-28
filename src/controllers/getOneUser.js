const LoginModel = require("../models/loginModel");

const getOneUser = async (req, res) => {
    const email = req.body;
    try {
        const posts = await LoginModel.findOne(email);
        console.log('All data :', posts);
        res.status(200).json(posts);
    } catch (error) {
        console.error('Error retrieving posts:', error);
        res.status(500).json({ error: 'Failed to retrieve posts' });
    }
}
module.exports = getOneUser