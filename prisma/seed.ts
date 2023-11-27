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
seed();
