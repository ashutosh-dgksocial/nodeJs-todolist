const express = require('express')
const app = express()
const dotenv = require("dotenv");

dotenv.config();
const port = 3000


app.use(express.urlencoded({ extended: true }));// for parsing application/x-www-form-urlencoded
const mongoose = require("mongoose");
//connection to db
mongoose.set("useFindAndModify", false);
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => {
console.log("Connected to db!");
app.listen(3000, () => console.log("Server Up and running"));
});

app.set("view engine", "ejs"); // for rendering ejs files

app.use("/static", express.static("public")); // for serving static files


app.get('/', (req, res) => {
    res.render("todo.ejs");  // for rendering the form
})

app.post('/',(req, res) => {
    console.log(req.body);
    });
    

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})