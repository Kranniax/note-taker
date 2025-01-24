import express from "express";
const router = express.Router();

import apiRoutes from "./noteRoutes.js";

router.use(apiRoutes);

export default router;
