import { PrismaClient } from "@prisma/client";
import express from "express";
import cors from "cors";
import { json } from "express";
import { Category } from "../frontend/types";
import { AuthMiddleware } from "./auth/middleware";
import { toToken } from "./auth/jwt";

const app = express();
const port = 3001;
const prisma = new PrismaClient();

app.use(json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.get("/recipes", async (req, res) => {
  const allRecipes = await prisma.recipe.findMany({
    include: {
      category: true,
    },
  });
  res.status(200).send(allRecipes);
});

app.get("/categories", async (req, res) => {
  const allCategories = await prisma.category.findMany({});
  res.status(200).send(allCategories);
});

app.get("/recipes/:id", async (req, res) => {
  const idAsNumber = Number(req.params.id);
  const aRecipe = await prisma.recipe.findUnique({
    where: {
      id: idAsNumber,
    },
    include: {
      category: true,
      comment: true,
      user: true,
    },
  });
  if (!aRecipe) {
    res.status(404).send({
      message: "Recipe with that id not found",
    });
    return; // use an empty return here
  }
  res.status(200).send(aRecipe);
  console.log(aRecipe.category);
  console.log(aRecipe.comment);
});

app.get("/comments", async (req, res) => {
  const allComments = await prisma.comment.findMany({});
  res.status(401).send(allComments);
});

app.post("/comments", async (req, res) => {
  const requestBody = req.body;
  console.log("got the post request");
  const commentsData = await prisma.comment.create({
    data: { ...requestBody, created_at: new Date() },
  });
  res.send(commentsData);
});

app.get("/comments/:id", async (req, res) => {
  const idAsNumber = Number(req.params.id);
  const aComment = await prisma.recipe.findUnique({
    where: {
      id: idAsNumber,
    },
    // include: {
    //   category: {
    //     select: { id: true, name: true },
    //   },
    // },
    include: {
      category: true,
      comment: true,
      user: true,
    },
  });
  if (!aComment) {
    res.status(404).send({
      message: "Comment with that id not found",
    });
    return; // use an empty return here
  }
  res.status(401).send(aComment);
});

app.post("/recipes", async (req, res) => {
  const requestBody = req.body;

  if (
    "name" in requestBody &&
    "instructions" in requestBody &&
    "ingredients" in requestBody &&
    "prep_time" in requestBody &&
    "serves" in requestBody &&
    "img_url" in requestBody
  ) {
    try {
      console.log(requestBody);
      const newRecipe = await prisma.recipe.create({
        data: {
          ...requestBody,
          userId: 1,
          category: {
            connect: requestBody.category.map((category: Category) => ({
              id: category.id,
            })),
          },
        },
      });
      console.log("POST RECEIVED!");
      res.status(201).send(newRecipe);
    } catch (e) {
      console.error(e);
      res.status(500).send({ message: "Something went wrong" });
    }
  } else {
    res.status(400).send({
      message:
        '"name", "ingredients", "instructions", "prep_time", "serves", "img_url" and so on is required.',
    });
  }
});

app.post("/login", async (req, res) => {
  const requestBody = req.body;
  if ("username" in requestBody && "password" in requestBody) {
    try {
      const userToLogin = await prisma.user.findFirst({
        where: {
          username: requestBody.name,
        },
      });
      if (userToLogin && userToLogin.password === requestBody.password) {
        const token = toToken({ userId: userToLogin.id });
        res.status(200).send({ message: "User logged in!", token: token });
        return;
      }
      res.status(400).send({ message: "Login failed" });
    } catch (e) {
      res.status(500).send({ message: "Something went wrong" });
    }
  } else {
    res
      .status(400)
      .send({ message: "'username' and 'password' are required!" });
  }
});

app.listen(port, () => {
  console.log(`⚡ Server listening on port: ${port}`);
});
