const express = require('express')
const app = express.Router()
const mongoose = require('mongoose')
const Post = require("../models/postModel")

mongoose.connect('mongodb://localhost:27017/express_mongo')
    .then(() => { console.log('mongo connected') })
    .catch(err => console.error('MongoDB connection error:', err))

app.get('/', async (req, res) => {
    try {   
        const posts = await Post.find();
        console.log('All data :', posts);
        res.status(200).json(posts);
    } catch (error) {
        console.error('Error retrieving posts:', error);
        res.status(500).json({ error: 'Failed to retrieve posts' });
    }
})

app.get('/one', async (req, res) => {
    const email = req.body;
    try {
        const posts = await Post.findOne(email);
        console.log('All data :', posts);
        res.status(200).json(posts);
    } catch (error) {
        console.error('Error retrieving posts:', error);
        res.status(500).json({ error: 'Failed to retrieve posts' });
    }
})

app.post('/', async (req, res) => {
    try {
        const { email, contact, name } = req.body;
        const newPost = new Post({
            name,
            email,
            contact
        });

        if (name.length <= 6) {
            console.log('name must be more than 6 characters');
            return res.status(400).json({ error: 'name must be more than 6 characters' })
        }

        if (!/^\d{10}$/.test(contact)) {
            console.log('contact number must be 10-digit number');
            return res.status(400).json({ error: 'contact number must be 10-digit number' });
        }
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|co\.in)$/i.test(email)) {
            console.log('Invalid email address');
            return res.status(400).json({ error: 'Invalid email address' });
        }

        await newPost.save();
        console.log('login successfully :', { email, contact, name });
        res.status(201).send("login successfully");
    } catch (error) {
        if (error.code === 11000 && error.keyPattern && error.keyValue) {
            console.log('Email address already exists');
            return res.status(400).json({ error: 'Email address already exists' });
        } else {
            console.error('Error creating post:', error);
            res.status(500).json({ error: 'Failed to create post' });
        }
    }
});


app.patch('/', async (req, res) => {
    try {
        const { email, name, contact } = req.body;
        if (!email) {
            return res.status(400).json({ error: 'Email is required for updating post' });
        }

        const updates = {};
        if (name) {
            updates.name = name;
        }
        if (contact) {
            if (contact.toString().length !== 10) {
                return res.status(400).json({ error: 'Contact number must be 10 digits' });
            }
            updates.contact = contact;
        }

        const patchData = await Post.findOneAndUpdate({ email: email }, updates, { new: true });
        if (!patchData) {
            return res.status(404).json({ error: 'Post not found' });
        }

        console.log('Post updated successfully:', patchData);
        res.status(200).json(patchData);
    } catch (error) {
        console.error('Error updating post:', error);
        res.status(500).json({ error: 'Failed to update post' });
    }
});


app.put('/', async (req, res) => {
    try {
        const { name, email, contact } = req.body;

        if (!email) {
            return res.status(400).json({ error: 'Email is required for updating post' });
        }

        if (contact && contact.toString().length !== 10) {
            return res.status(400).json({ error: 'Contact number must be 10 digits' });
        }

        const putData = await Post.findOneAndReplace({ email: email }, { name, email, contact }, { new: true });
        if (!putData) {
            return res.status(404).json({ error: 'Post not found' });
        }

        console.log('Put data successfully:', putData);
        res.status(200).json(putData);
    } catch (error) {
        console.error('Error updating post:', error);
        res.status(500).json({ error: 'Failed to update post' });
    }
});

// DELETE route to delete a post by email
app.delete('/', async (req, res) => {
    try {
        const { email } = req.body;

        // Validate email
        if (!email) {
            return res.status(400).json({ error: 'Email is required for deleting post' });
        }

        // Find the post by email and delete it
        const deletedPost = await Post.findOneAndDelete({ email: email });

        // Check if the post exists
        if (!deletedPost) {
            return res.status(404).json({ error: 'Post not found' });
        }

        console.log('Post deleted successfully:', deletedPost);
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ error: 'Failed to delete post' });
    }
});


module.exports = app