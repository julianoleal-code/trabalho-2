import { Router } from "express";
import usuarioController from "../controllers/usuario.controller.js";

const router = Router();

router.post("/", usuarioController.createUsuarioController);
router.get("/", usuarioController.findAllUsuarioController);
router.get("/:id", usuarioController.findUsuarioByIdController);
router.put("/:id", usuarioController.updateUsuarioController);
router.delete("/:id", usuarioController.deleteUsuarioController);

export default router;