import { PrismaClient } from "@prisma/client";
import recipes from "./data/recipes.json";
import categories from "./data/categories.json";
import users from "./data/users.json";
import comments from "./data/comments.json";

const prisma = new PrismaClient();

const seed = async () => {
  for (let i = 0; i < categories.length; i += 1) {
    const categoriesData = categories[i];
    if (categoriesData) {
      await prisma.category.create({
        data: {
          name: categoriesData.name,
          img_url: categoriesData.img_url,
        },
      });
    }
  }

  for (let i = 0; i < users.length; i += 1) {
    const userData = users[i];
    if (userData) {
      await prisma.user.create({
        data: userData,
      });
    }
  }

  for (let i = 0; i < recipes.length; i += 1) {
    const recipesData = recipes[i];
    await prisma.recipe.create({
      data: recipesData,
    });
  }

  for (let i = 0; i < comments.length; i += 1) {
    const commentData = comments[i];
    if (commentData) {
      await prisma.comment.create({
        data: commentData,
      });
    }
  }
};
seed();
