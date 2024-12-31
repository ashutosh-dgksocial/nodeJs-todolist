// index.js
const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require("mongoose");
const TodoTask = require("./models/TodoTask");

app.use("/static", express.static('public'));

app.use(express.urlencoded({ extended: true }));

// Connection to db using async/await
async function connectToDB() {
    try {
        await mongoose.connect(process.env.DB_CONNECT);
        console.log("Connected to db!");
        app.listen(3000, () => console.log("Server up and running"));
    } catch (error) {
        console.error("Database connection error:", error);
    }
}

connectToDB();

app.set('view engine', 'ejs'); // this is for using ejs template engine

// GET METHOD
app.get("/", async (req, res) => {
    try {
        const tasks = await TodoTask.find({})
        res.render("todo.ejs", { todoTasks: tasks });

    } catch (err) {
        res.status(500).send("Error retrieving tasks");
    }

});

//UPDATE
app.route("/edit/:id")
    .get(async (req, res) => {
        const id = req.params.id;
        try {
            const tasks = await TodoTask.find({});
            res.render("todoEdit.ejs", { todoTasks: tasks, idTask: id });
        } catch (err) {
            res.status(500).send("Error retrieving tasks");
        }
    })
    .post(async (req, res) => {
        const id = req.params.id;
        try {
            await TodoTask.findByIdAndUpdate(id, { content: req.body.content });
            res.redirect("/");
        } catch (err) {
            res.status(500).send("Error updating task");
        }
    });

//DELETE
app.route("/remove/:id").get(async (req, res) => {
    const id = req.params.id;
    try {
        await TodoTask.findByIdAndDelete(id);
        res.redirect("/");
    } catch (err) {
        res.status(500).send(err);
    }
});