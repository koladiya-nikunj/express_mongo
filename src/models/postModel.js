const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    
    contact: {
        type: Number,
        required: true,
    }
});

const Post = mongoose.model('Login', postSchema);
module.exports = Post;
