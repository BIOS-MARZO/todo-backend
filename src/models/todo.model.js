const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({  
    title: {    type: String,    required: false,  },  
    description: {    type: String,    required: true,  },  
    is_completed: {    type: Boolean,    required: true,  },
    user_id: { type: Number, required: true }
}, {
    timestamps: true,
})

const Todo = mongoose.model('Todo', todoSchema)

module.exports = {
    Todo
}