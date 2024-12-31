// index.js
const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const TodoTask = require('./models/TodoTask');

app.use('/static', express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Connection to DB using async/await
async function connectToDB() {
  try {
    await mongoose.connect(process.env.DB_CONNECT);
    console.log('Connected to DB!');
    app.listen(3000, () => console.log('Server up and running'));
  } catch (error) {
    console.error('Database connection error:', error);
  }
}

connectToDB();

app.set('view engine', 'ejs'); // Use EJS template engine

// GET Method to retrieve tasks
app.get('/', async (req, res) => {
  try {
    const tasks = await TodoTask.find({});
    res.render('todo.ejs', { todoTasks: tasks });
  } catch (err) {
    res.status(500).send('Error retrieving tasks');
  }
});

// POST Method to create a new task
app.post('/', async (req, res) => {
  try {
    const newTask = new TodoTask({
      content: req.body.content
    });
    await newTask.save();
    res.redirect('/');
  } catch (err) {
    res.status(500).send('Error adding new task');
  }
});

// UPDATE Task (GET and POST)
app.route('/edit/:id')
  .get(async (req, res) => {
    const id = req.params.id;
    try {
      const task = await TodoTask.findById(id); // Fetch the specific task for editing
      res.render('todoEdit.ejs', { todoTasks: [task], idTask: id });
    } catch (err) {
      res.status(500).send('Error retrieving task for editing');
    }
  })
  .post(async (req, res) => {
    const id = req.params.id;
    try {
      await TodoTask.findByIdAndUpdate(id, {
        content: req.body.content
      });
      res.redirect('/');
    } catch (err) {
      res.status(500).send('Error updating task');
    }
  });

// DELETE Task
app.route('/remove/:id').get(async (req, res) => {
  const id = req.params.id;
  try {
    await TodoTask.findByIdAndDelete(id);
    res.redirect('/');
  } catch (err) {
    res.status(500).send('Error deleting task');
  }
});
