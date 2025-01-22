import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
// import db from "./db/db.json";
// import db from "./db/db.json" assert { type: "json" };

// Converting the __dirname CommonJs equivalent to ESM.
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.static("public"));

// Get saved notes.
app.get("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", (err, data) => {
    if (err) {
      res.status(500).send("Error reading JSON file");
      return;
    }

    try {
      const jsonData = JSON.parse(data);
      res.setHeader("Content-Type", "application/json");
      res.send(jsonData);
    } catch (parseErr) {
      res.status(500).send("Error parsing JSON data");
    }
  });
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
