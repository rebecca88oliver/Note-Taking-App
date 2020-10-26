//dependencies
let db = require("../db/db.json");
const fs = require('fs');

//functions
//re-index data array
function reindexDB(dbArray){
  let newDB = [];
  for (let i = 0; i < dbArray.length; i++) {
    let reIndexedNote = dbArray[i];
    reIndexedNote.id = i + 1;
    newDB[i] = reIndexedNote;
  }
  return newDB;
}
//save the data array to db.json
function writeDB(dbArray){
  fs.writeFile('./db/db.json', JSON.stringify(dbArray), function (err) {
    if (err) throw err;
  });
}

//route
module.exports = function(app) {
  // API GET request
  app.get("/api/notes", function(req, res) {
    res.json(db);
  });

  //API POST request
  app.post("/api/notes", function(req, res) {
    const newNote = req.body;
    db.push(newNote);
    db = reindexDB(db);
    writeDB(db);
    res.json(newNote);
  });

  //Delete Request
  app.delete("/api/notes/:id", function(req, res) {
    const deletedNoteID = req.params.id;
    const deletedNote = db.splice(deletedNoteID-1, 1);
    //rewrite to db array with new indexes
    db = reindexDB(db);
    //write newDB array
    writeDB(db);
    //response
    res.json(deletedNote);
  });
};