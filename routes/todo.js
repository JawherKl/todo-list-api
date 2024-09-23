const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");

// GET: Retrieve all todos
router.get("/", async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET: Retrieve a single to-do by ID
router.get("/:id", getTodo, (req, res) => {
    res.json(res.todo);
});

// POST: Create a new to-do
// POST route to create a new todo
router.post('/', async (req, res) => {
    try {
        const todo = new Todo({
            title: req.body.title,  // Accessing title from the request body
            description: req.body.description,  // Assuming you have a description field
            completed: req.body.completed || false  // Optional: Defaults to false if not provided
        });

        const newTodo = await todo.save();  // Save the new todo to the database
        res.status(201).json(newTodo);  // Respond with the created todo
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PATCH: Update a to-do by ID
router.patch("/:id", getTodo, async (req, res) => {
    if (req.body.title != null) {
        res.todo.title = req.body.title;
    }
    if (req.body.description != null) {
        res.todo.description = req.body.description;
    }
    if (req.body.completed != null) {
        res.todo.completed = req.body.completed;
    }
    try {
        const updatedTodo = await res.todo.save();
        res.json(updatedTodo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE: Delete a to-do by ID
router.delete("/:id", getTodo, async (req, res) => {
    try {
        await res.todo.remove();
        res.json({ message: "Todo deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Middleware to get a single to-do by ID
async function getTodo(req, res, next) {
    let todo;
    try {
        todo = await Todo.findById(req.params.id);
        if (todo == null) {
            return res.status(404).json({ message: "Cannot find todo" });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.todo = todo;
    next();
}

module.exports = router;