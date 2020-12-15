//Dependencies
const express = require("express");
const fs = require("fs");
const path = require("path");

//leave as let for app.delete function to work!!! 
let notesData = require("./db/db.json");

//Creating an express server and specifying a port
const app = express();
const PORT = process.env.PORT || 8080;

//Middlewares
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

//add folders w/ static files like CSS and Javascript for server use
app.use(express.static(path.join(__dirname, './public')));


//HTML routes
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

//API routes
app.get("/api/notes", (req, res) => {
    fs.readFile('./db/db.json', 'utf8', function (err, data) {
        res.json(JSON.parse(data));
    });
});

app.post("/api/notes", (req, res) => {
    const newNote = req.body;
    console.log(notesData);
    notesData.push(newNote);
    fs.writeFile('./db/db.json', JSON.stringify(notesData), function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
    res.json(newNote);
});

app.delete('/api/notes/:id', (req, res) => {
    const chosen = req.params.id;
    fs.readFile('./db/db.json', 'utf8', function (err, data) {
        notesData = JSON.parse(data);
        for (let i = 0; i < notesData.length; i++) {
            if (notesData[i].id === chosen) {
                notesData.splice(i, 1);
                fs.writeFile('./db/db.json', JSON.stringify(notesData), function (err) {
                    if (err) throw err;
                    res.send(notesData);
                });
            }
        }


    });
});

//listening...
app.listen(PORT, () => {
    console.log("App listening on PORT: " + PORT);
});