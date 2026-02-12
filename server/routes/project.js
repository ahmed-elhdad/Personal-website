import express from "express";
import verifyToken from "../middlewares/verifyToken.js";
import {
  create,
  edit,
  get,
  love,
  remove,
  unLove,
} from "../controllers/project.js";
const router = express.Router();
router.post("/new", create);
router.get("/:id", get);
router.put("/:id", verifyToken, edit);
router.delete("/:id", remove);
router.post("/love/:id", verifyToken, love);
router.post("/unlove/:id", verifyToken, unLove);
export default router;
