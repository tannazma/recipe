import { useEffect, useState } from "react";
import { Category, User, Comment } from "../../../types";
import { useRouter } from "next/router";

const RecipeDetailPAge = () => {
  const router = useRouter();
  const idFromUrl = router.query.recipeId;
  console.log(idFromUrl);

  const [getRecipe, setRecipe] = useState<Recipe | null>(null);

  interface Recipe {
    id: number;
    name: string;
    category: Category[];
    img_url: string;
    instructions: string;
    ingredients: string;
    prep_time: number;
    serves: number;
    userId: number;
  }

  useEffect(() => {
    if (idFromUrl === undefined) {
      return;
    }

    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:3001/recipes/${idFromUrl}`
      );
      const data = await response.json();
      console.log(data);
      setRecipe(data);
    };
    fetchData();
  }, [idFromUrl]);
  return (
    <>
      <div>
        {getRecipe !== null ? (
          <div>
            <h1>{getRecipe.name}</h1>
            <img src={getRecipe.img_url} />
            <p>Ingredients: {getRecipe.ingredients}</p>
            <p>Instructions: {getRecipe.instructions}</p>
            <div>
              Category:
              {getRecipe.category &&
                getRecipe.category.map((category) => (
                  <p key={category.id}>{category.name}</p>
                ))}
            </div>
          </div>
        ) : (
          <div>Url not found...</div>
        )}
      </div>
    </>
  );
};
export default RecipeDetailPAge;
