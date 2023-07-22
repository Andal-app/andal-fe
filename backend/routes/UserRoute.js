import express from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/UserController.js";
import { verifyUser, kepegawaianOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/users", verifyUser, kepegawaianOnly, getUsers);
router.get("/users/:id", verifyUser, getUserById);
router.post("/users", createUser);
router.patch("/users/:id", verifyUser, updateUser);
router.delete("/users/:id", verifyUser, kepegawaianOnly, deleteUser);

export default router;
