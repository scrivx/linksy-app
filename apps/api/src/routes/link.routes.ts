import { Router } from "express";
import * as controller from "../controllers/link.controller";

const router = Router();

router.post("/api/links", controller.createLink);
router.get("/:alias", controller.redirect);

export default router;
