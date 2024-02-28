const express = require('express');
const router = express.Router();
const postLogin = require(".././controllers/register_login/postLogin");
const postUser = require('../controllers/postUser');
const getUser = require('../controllers/getUser');
const getOneUser = require('../controllers/getOneUser');
const patchUser = require('../controllers/patchUser');
const putUser = require('../controllers/putUser');
const deleteUser = require('../controllers/deleteUser');
const postRegister = require('.././controllers/register_login/postRegister');

const routes = [
    { method: 'POST', url: '/login', handler: postLogin },
    { method: 'POST', url: '/register', handler: postRegister },
    {
        method: 'GET',
        url: '/',
        handler: getUser
    },
    {
        method: 'GET',
        url: '/one',
        handler: getOneUser
    },
    {
        method: 'POST',
        url: '/',
        handler: postUser
    },
    {
        method: 'PATCH',
        url: '/',
        handler: patchUser
    },
    {
        method: 'PUT',
        url: '/',
        handler: putUser
    },
    {
        method: 'DELETE',
        url: '/',
        handler: deleteUser
    },
];

routes.forEach(route => {
    const { method, url, handler } = route;
    router[method.toLowerCase()](url, handler);
});

module.exports = router;

