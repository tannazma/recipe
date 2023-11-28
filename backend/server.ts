import { PrismaClient } from "@prisma/client";
import express from "express";
import cors from "cors";
import { json } from "express";

const app = express();
const port = 3001;
const prisma = new PrismaClient();

app.use(json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.get("/recipes", async (req, res) => {
  const allRecipes = await prisma.recipe.findMany({});
  res.status(401).send(allRecipes);
});

app.listen(port, () => {
  console.log(`⚡ Server listening on port: ${port}`);
});
