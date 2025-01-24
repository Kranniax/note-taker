import express from "express";
// Import API/HTML routes from separate routes file
import apiRoutes from "./routes/apiRoutes/index.js";
import htmlRoutes from "./routes/htmlRoutes/index.js";

// Define port, using environment PORT or default to 3001
const PORT = process.env.PORT || 3001;
const app = express();

// Serve static files from 'public' directory
app.use(express.static("public"));
// Middleware to parse URL-encoded data with extended option
app.use(express.urlencoded({ extended: true }));
// Middleware to parse incoming JSON data
app.use(express.json());

// Route API requests to apiRoutes handler
app.use("/api", apiRoutes);
// Route root and HTML requests to htmlRoutes handler
app.use("/", htmlRoutes);

// Start server and listen on specified port
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
