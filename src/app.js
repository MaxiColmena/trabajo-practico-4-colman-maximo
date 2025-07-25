import express from "express";
import dotenv from "dotenv";
import CharacterRoutes from "./routes/character.routes.js";
import startDB from "./config/db.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT;
app.use(express.json());
app.use("/api", CharacterRoutes);

startDB().then(()=>{app.listen(PORT, ()=>{
    console.log("Escuchando en el puerto:", PORT);
})});