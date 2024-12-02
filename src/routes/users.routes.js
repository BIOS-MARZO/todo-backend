const express = require('express');
const { getAllUsersController } = require('../controllers/users.controller');

const routes = express.Router()

routes.get('', getAllUsersController);

module.exports = {
    usersRouter: routes
}