import express from "express";
import {createCharacter} from "../controllers/character.controllers.js";
const router = express.Router();

router.post("/characters", createCharacter);
router.get("/characters", getAllCharacters);
router.get("/characters/:id", getCharacterById);
router.put("/characters/:id", updateCharacter);
router.delete("/characters/:id", deleteCharacter);

export default router;