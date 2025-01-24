import express from "express";
import fs from "fs";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();
// Converting the __dirname CommonJs equivalent to ESM.
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Get saved notes.
router.get("/notes", (req, res) => {
  fs.readFile(path.join(__dirname, "../../db/db.json"), (err, data) => {
    if (err) {
      res.status(500).send("Error reading JSON file");
      return;
    }

    try {
      // converts data file to JavaScript object.
      const jsonData = JSON.parse(data);
      res.setHeader("Content-Type", "routerlication/json");
      res.send(jsonData);
    } catch (parseErr) {
      res.status(500).send("Error parsing JSON data");
    }
  });
});
// Post a note
router.post("/notes", (req, res) => {
  // Validate request body
  if (!req.body.title || !req.body.text) {
    return res.status(400).json({ error: "Title and text are required" });
  }
  // Add a unique id to notes.
  req.body.id = uuidv4();
  // Add timestamps to notes. (Optional)
  req.body.createdAt = new Date().toISOString();

  // Read json file and then convert to Javascript Object notation.
  fs.readFile(path.join(__dirname, "../../db/db.json"), (err, data) => {
    if (err) throw err;
    const jsonData = JSON.parse(data);
    // Add req.body to json file.
    jsonData.push(req.body);

    // Update and write json file.
    fs.writeFile(
      path.join(__dirname, "../../db/db.json"),
      JSON.stringify(jsonData, null, 2),
      (err) => {
        if (err) throw err;
      }
    );
    // Send success response
    res.status(201).json(req.body);
  });
});
router.delete("/notes/:id", (req, res) => {
  // console.log(req.params.id);

  // Read json file
  fs.readFile(path.join(__dirname, "../../db/db.json"), (err, data) => {
    if (err) throw err;
    // Convert to Javascript object notation.
    const jsonData = JSON.parse(data);
    const updatedData = jsonData.filter((note) => note.id !== req.params.id);

    // Check if a note was actually deleted
    if (updatedData.length === jsonData.length) {
      return res.status(404).json({ error: "Note not found" });
    }
    // Update and write json file.
    fs.writeFile(
      path.join(__dirname, "../../db/db.json"),
      JSON.stringify(updatedData, null, 2),
      (err) => {
        if (err) {
          return res.status(500).json({ error: "Could not delete note" });
        }
        res.status(200).json({ message: "Note deleted successfully" });
      }
    );
  });
});
export default router;
