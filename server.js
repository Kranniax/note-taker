import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Converting the __dirname CommonJs equivalent to ESM.
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = process.env.PORT || 3001;
const app = express();

// Get current saved notes. 
app.get("/api/notes", (req,res)=> {
  res.json(); 
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
