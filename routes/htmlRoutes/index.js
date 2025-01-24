import express from "express";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
const router = express.Router();
// Converting the __dirname CommonJs equivalent to ESM.
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Serve notes page to client side.
router.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/notes.html"));
});
// Serve main index page to client side/ any other route is requested.
router.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/index.html"));
});

export default router;
