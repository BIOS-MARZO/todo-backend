const { connectDb } = require("../config/connectDb");
const { Todo } = require("../models/todo.model");
const jwt = require('jsonwebtoken')
const SECRET = process.env.JWT_SECRET
let todos = [
    {
        id: 1,
        description: "Aprender a Jugar FC",
        isCompleted: false,
    }
];

const getTodosController = async (request, response) => {
    try {
        const result = await connectDb.query('SELECT * FROM todos')
        response.json(result.rows)
    } catch (error) {
        console.error(error)
        response.status(500).send('Error al obtener las tareas')
    }
};

const createTodoController = async (request, response) => {
    const { title, description, is_completed } = request.body
    console.log('User desde Midleware', request.user)
    const userId = request.user.id

    try {
        const newTodo = new Todo({
            title,
            description,
            is_completed,
            user_id: userId
        });

        await newTodo.save();
        
        response.status(201).json({
            status: 'OK',
            message: 'Todo creado correctamente.',
            data: newTodo
        })
    } catch (error) {
        console.error('Error al crear el todo', error)
        response.status(500).json({
            status: 'error',
            message: 'Error al crear un nuevo todo.'
        })
    }
}

const updateTodoController = (request, response) => {
    const { todoId } = request.params;
    const index = todos.findIndex(todo => todo.id === parseInt(todoId));
    if (index !== -1) {

        todos[index] = {
        ...todos[index],
        ...request.body
        }
        response.json(todos[index])
    } else {
        response.status(404).send('No encontramos ninguna tarea con ese id')
    }
}

const deleteTodoController = (request, response) => {
    const { id } = request.params;
    todos = todos.filter(todo => todo.id !== parseInt(id));
    response.status(204).send();
}

module.exports = {
    getTodosController,
    createTodoController,
    updateTodoController,
    deleteTodoController
}