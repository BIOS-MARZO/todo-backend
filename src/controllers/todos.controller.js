const { connectDb } = require("../config/connectDb");

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

const createTodoController = (request, response) => {
    const newTodo = {
        id: Date.now(),
        ...request.body
    }

    todos.push(newTodo)
    response.json(newTodo)
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