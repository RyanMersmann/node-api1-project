// this pulls the dependency from node_modules now instead of stdlib
const express = require("express")
const db = require("./database.js")

// create a new express server
const server = express();
//installing some middleware that helps us parse JSON request bodies.
server.use(express.json())

server.get("/", (req, res) => {
    res.json({message: "Hello, Ryan! I Love you"})
})

server.get("/users", (req, res) => {
    const users = db.getUsers();
    res.json(users)
})

server.get("/users/:id", (req, res) => {
    const id = req.params.id
    const user = db.getUserById(id)

    if (user) {
       res.json(user) 
    }
    else {
        res.status(404).json({ message: "User not found" })
    }
})

server.post("/users", (req, res) => {
    const newUuser = db.createUser({
        name: req.body.name,
    });

    res.status(201).json(newUuser)
})

server.delete("/users/:id", (req, res) => {
    const user = db.getUserById(req.params.id)
    if (user) {
        db.deleteUser(req.params.id)
        res.status(204).end()
    } else {
        res.status(404).json({
            message: "User not found"
        })
    }
});

server.listen(8080, () => {
    console.log("Express server started on port 8080")
})