require('dotenv').config()

const express = require('express');
const { authRoutes } = require('./routes/auth.routes');
const { todosRouter } = require('./routes/todos.routes');
const { verifyToken } = require('./middlewares/auth.middleware');
const { connectMongoDb } = require('./config/mongoDb');

const app = express();

app.use(express.json())

const PORT = process.env.API_PORT;

connectMongoDb();

app.use('/auth', authRoutes)

app.use(verifyToken)

app.use('/todos', todosRouter)

app.listen(PORT, () => {
  console.log(`Servidor corriendo o escuchando en http://localhost:${PORT}`)
})

      