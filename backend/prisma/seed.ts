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
    const usersData = users[i];
    if (usersData) {
      await prisma.user.create({
        data: {
          username: usersData.username,
          password: usersData.password,
        },
      });
    }
  }

  for (let i = 0; i < recipes.length; i += 1) {
    const recipesData = recipes[i];
    await prisma.recipe.create({
      data: {
        name: recipesData.name,
        img_url: recipesData.img_url,
        instructions: recipesData.instructions,
        ingredients: recipesData.ingredients,
        prep_time: recipesData.prep_time,
        serves: recipesData.serves,
        user: { connect: { id: recipesData.id } },
      },
    });
  }

  for (let i = 0; i < comments.length; i += 1) {
    const commentsData = comments[i];
    if (commentsData) {
      await prisma.comment.create({
        data: {
          name: commentsData.name,
          message: commentsData.message,
          rating: commentsData.rating,
          created_at: commentsData.created_at,
          recipeId: commentsData.recipeId,
        },
      });
    }
  }
};
seed();
