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

const getTodosController = async (request, response) => {
    const userId = request.user.id
    try {
        const todos = await Todo.find({ user_id: userId })
        response.json(todos)
    } catch (error) {
        console.error(error)
        response.status(500).send('Error al obtener las tareas')
    }
};


const updateTodoController = async (request, response) => {
    const { todoId } = request.params;
    const { isCompleted } = request.body;
    console.log(request, 'request')

    try {
        console.log("todoId", todoId)
        const updateToDo = await Todo.findByIdAndUpdate(
            todoId,
            { is_completed: isCompleted },
            { new: true } // Devuelve el documento actualizado
        )

        if (!updateToDo) {
            return response.status(404).json({
                status: 'not found',
                message: 'Tarea no encontrada.'
            })
        }

        response.status(200).json({
            status: 'OK',
            message: 'Tarea actualizada correctamente.',
            data: updateToDo
        })
    } catch (error) {
        console.error('Error al actualizar todos.', error)
        response.status(500).json({
            status: 'error',
            message: 'Algo fallo al actualizar.'
        })
    }
}

const deleteTodoController = async (request, response) => {
    const { todoId } = request.params;

    try {
        const deletedTodo = await Todo.findByIdAndDelete(todoId);

        if (!deletedTodo) {
            return response.status(404).json({
                status: 'not found',
                message: 'Tarea no encontrada.'
            })
        }

        response.status(204).json({
            status: 'OK',
            message: 'Tarea eliminada correctamente.'
        })

    } catch (error) {
        console.error('Error al eliminar tarea.', error);
        response.status(500).json({
            status: 'error',
            message: 'Error al eliminar la tarea.'
        })
    }
}

module.exports = {
    getTodosController,
    createTodoController,
    updateTodoController,
    deleteTodoController
}