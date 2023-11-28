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

app.get("/recipes/:id", async (req, res) => {
  const idAsNumber = Number(req.params.id);
  const aRecipe = await prisma.recipe.findUnique({
    where: {
      id: idAsNumber,
    },
  });
  if (!aRecipe) {
    res.status(404).send({
      message: "Recipe with that id not found",
    });
    return; // use an empty return here
  }
  res.status(401).send(aRecipe);
});

app.listen(port, () => {
  console.log(`⚡ Server listening on port: ${port}`);
});
