import { PrismaClient } from "@prisma/client";
import categories from "./data/categories.json";
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
seed();
