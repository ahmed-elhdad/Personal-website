import express from "express";
import verifyToken from "../middlewares/verifyToken.js";
import { create } from "../controllers/project.js";
const router = express.Router();
router.post("/new", create);
router.put("/new", verifyToken, create);
router.post("/new", verifyToken, create);
export default router;
