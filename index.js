const express = require('express')
const app = express()
const port = 3000

app.use(express.urlencoded({ extended: true }));// for parsing application/x-www-form-urlencoded
app.set("view engine", "ejs"); // for rendering ejs files

app.get('/', (req, res) => {
    res.render("todo.ejs");  // for rendering the form
})

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})