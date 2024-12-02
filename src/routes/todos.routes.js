const express = require('express');
const { 
    getTodosController,
    createTodoController,
    updateTodoController,
    deleteTodoController 
} = require('../controllers/todos.controller');
const routes = express.Router();

routes.get('', getTodosController);
routes.post('', createTodoController);
routes.put('/:todoId', updateTodoController);
routes.delete('/:todoId', deleteTodoController);

module.exports = {
    todosRouter: routes
};