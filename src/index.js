require('dotenv').config()

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const { connectDb } = require('./db/connectDb');

const app = express();

app.use(express.json())

const PORT = process.env.API_PORT;
const JWT_SECRET = process.env.JWT_SECRET

const DEFAULT_RESPONSE = {
  "greeting": "Bienvenido a mi API!!!!"
}

app.get('/', (request, response) => {
  response.json(DEFAULT_RESPONSE)
});


app.get('/todos', async (request, response) => {
  try {
    const result = await connectDb.query('SELECT * FROM todos')
    response.json(result.rows)
  } catch (error) {
    console.error(error)
    response.status(500).send('Error al obtener las tareas')
  }
});

let todos = [
  {
    id: 1,
    description: "Aprender a Jugar FC",
    isCompleted: false,
  }
];

app.post('/todos', (request, response) => {
  const newTodo = {
    id: Date.now(),
    ...request.body
  }

  todos.push(newTodo)
  response.json(newTodo)
})

app.put('/todos/:todoId', (request, response) => {
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
})


app.delete('/todos/:id', (request, response) => {
  const { id } = request.params;
  todos = todos.filter(todo => todo.id !== parseInt(id));
  response.status(204).send();
})

app.post('/register', async (request, response) => {
  const { fullName, email, password } = request.body;

  try {
    const existingUser = await connectDb.query('SELECT * FROM users WHERE email = $1', [email])

    if (existingUser.rows.length > 0) {
      return response.status(400).json({
        error: 'El usuario ya esta registrado'
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10);


    const result = await connectDb.query(
      'INSERT INTO users (full_name, email, password) VALUES ($1, $2, $3) RETURNING id, full_name, email', [fullName, email, hashedPassword]
    );

    const newUser = result.rows[0];

    const token = jwt.sign(
      {
        id: newUser.id, 
        email: newUser.email
      },
      JWT_SECRET,
      {
        expiresIn: '8h'
      }
    );
    
    response.status(201).json({
      status: 'OK',
      message: 'Usuario registrado existosamente',
      user: newUser,
      token
    })

  } catch (error) {
    console.error(error);
    response.status(500).json({
      error: 'Error al registrar el usuario'
    })
  }
})


app.listen(PORT, () => {
  console.log(`Servidor corriendo o escuchando en http://localhost:${PORT}`)
})

      