import { PrismaClient } from "@prisma/client";
import recipes from "./data/recipes.json";
import categories from "./data/categories.json";
import users from "./data/users.json";

const prisma = new PrismaClient();

const seed = async () => {
  for (let i = 0; i < categories.length; i += 1) {
    const categoriesData = categories[i];
    if (categoriesData) {
      await prisma.category.create({
        data: {
          name: categoriesData.name,
          img_url: categoriesData.img_url,
          //   recipes: categoriesData.recipes,
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
    if (recipesData) {
      const userFound = await prisma.user.findFirst({
        where: { username: recipesData.user.username },
      });

      if (!userFound) {
        return;
      }

      await prisma.recipe.create({
        data: {
          name: recipesData.name,
          img_url: recipesData.img_url,
          instructions: recipesData.instructions,
          ingredients: recipesData.ingredients,
          prep_time: recipesData.prep_time,
          serves: recipesData.serves,
        //   user: { connect: { id: userFound.id } },
          userId: userFound.id
        },
      });
    }
  }
seed();
