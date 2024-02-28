const LoginModel = require("../models/loginModel");

const deleteUser = async(req,res) =>{
    try {
        const { contact } = req.body;

        if (!contact) {
            return res.status(400).json({ error: 'contact is required for deleting post' });
        }

        const deletedPost = await LoginModel.findOneAndDelete({ contact });
        if (!deletedPost) {
            return res.status(404).json({ error: `Number '${contact}' not found` });
        }

        console.log('Post deleted successfully:', deletedPost);
        res.status(200).json({ message: 'Post deleted successfully',deletedPost });
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ error: 'Failed to delete post' });
    }
}
module.exports = deleteUser