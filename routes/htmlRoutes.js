//dependencies
const path = require("path");

//routes
module.exports = function(app) {
  // use get to request routes
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
  });
};